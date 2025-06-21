import React, { useState, useEffect, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Play, Pause, Square, Mic, MicOff, Timer, Wind, AlertCircle, X } from 'lucide-react';

interface BreathingSessionProps {
  duration: number; // in seconds
  onSessionEnd: () => void;
}

export const BreathingSession: React.FC<BreathingSessionProps> = ({ 
  duration, 
  onSessionEnd 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycleProgress, setCycleProgress] = useState(0);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

  // ElevenLabs conversation hook
  const conversation = useConversation({
    onConnect: () => {
      console.log('AI Guide Connected');
      setAuthError(null);
      setMicrophoneError(null);
    },
    onDisconnect: () => console.log('AI Guide Disconnected'),
    onMessage: (message) => console.log('AI Message:', message),
    onError: (error) => {
      console.error('AI Guide Error:', error);
      // Handle different types of errors
      if (error.message?.includes('Permission denied') || error.message?.includes('NotAllowedError')) {
        setAuthError('Authentication failed. This might be a private agent or there\'s an issue with your API credentials.');
      } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
        setAuthError('API quota exceeded. Please check your ElevenLabs account limits.');
      } else {
        setAuthError(`Connection error: ${error.message}`);
      }
    },
  });

  // Breathing cycle timing (in seconds)
  const breathCycle = {
    inhale: 4,
    hold: 4,
    exhale: 6
  };

  const totalCycleTime = breathCycle.inhale + breathCycle.hold + breathCycle.exhale;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            onSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, onSessionEnd]);

  // Breathing animation cycle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setCycleProgress(prev => {
          const newProgress = (prev + 0.1) % totalCycleTime;
          
          if (newProgress < breathCycle.inhale) {
            setBreathPhase('inhale');
          } else if (newProgress < breathCycle.inhale + breathCycle.hold) {
            setBreathPhase('hold');
          } else {
            setBreathPhase('exhale');
          }
          
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, breathCycle.inhale, breathCycle.hold, totalCycleTime]);

  // Validate API credentials
  const validateCredentials = async (): Promise<boolean> => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/user', {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setAuthError('Invalid API key. Please check your ElevenLabs API key.');
          return false;
        } else if (response.status === 429) {
          setAuthError('API rate limit exceeded. Please wait a moment and try again.');
          return false;
        }
        throw new Error(`API validation failed: ${response.statusText}`);
      }

      console.log('API credentials validated successfully');
      return true;
    } catch (error) {
      console.error('Credential validation error:', error);
      setAuthError('Failed to validate API credentials. Please check your internet connection.');
      return false;
    }
  };

  // Get signed URL for agent authorization (handles both public and private agents)
  const getSignedUrl = async (): Promise<string> => {
    try {
      console.log('Requesting signed URL for agent:', agentId);
      
      const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`, {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key or insufficient permissions');
        } else if (response.status === 404) {
          throw new Error('Agent not found. Please check your agent ID');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait and try again');
        } else if (response.status === 403) {
          throw new Error('Access denied. You may not have permission to access this agent');
        }
        throw new Error(`Failed to get signed URL: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Signed URL obtained successfully');
      
      if (!data.signed_url) {
        throw new Error('No signed URL in response');
      }

      return data.signed_url;
    } catch (error) {
      console.error('Signed URL error:', error);
      throw error;
    }
  };

  // Test microphone access
  const testMicrophoneAccess = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      console.log('Microphone access granted');
      // Stop the stream immediately after testing
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone access denied:', error);
      return false;
    }
  };

  // Request microphone permission explicitly
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicrophoneError(null);
      alert('Microphone permission granted! You can now connect to the AI guide.');
    } catch (error) {
      console.error('Permission request failed:', error);
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setMicrophoneError('Please manually enable microphone permissions in your browser settings. Look for the microphone icon in your address bar and click "Allow".');
      }
    }
  };

  const startConversation = useCallback(async () => {
    try {
      // Clear any previous errors
      setMicrophoneError(null);
      setAuthError(null);
      
      console.log('Starting conversation setup...');
      
      // Step 1: Validate API credentials
      console.log('Validating API credentials...');
      const credentialsValid = await validateCredentials();
      if (!credentialsValid) {
        return; // Error already set in validateCredentials
      }
      
      // Step 2: Test microphone access
      console.log('Testing microphone access...');
      const microphoneAccess = await testMicrophoneAccess();
      if (!microphoneAccess) {
        setMicrophoneError('Microphone access is required for voice conversations. Please enable microphone permissions and try again.');
        return;
      }
      
      // Step 3: Get signed URL for authorization
      console.log('Getting signed URL...');
      const signedUrl = await getSignedUrl();
      
      // Step 4: Start the conversation with the signed URL
      console.log('Starting conversation session...');
      await conversation.startSession({
        signedUrl: signedUrl,
      });
      
      console.log('Conversation started successfully');
    } catch (error) {
      console.error('Failed to start AI guide conversation:', error);
      
      // Handle different types of errors
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
          case 'PermissionDeniedError':
            setMicrophoneError('Microphone access was denied. Please click the microphone icon in your browser\'s address bar and select "Allow", then try again.');
            break;
          case 'NotFoundError':
            setMicrophoneError('No microphone found. Please connect a microphone and try again.');
            break;
          case 'NotSupportedError':
            setMicrophoneError('Your browser does not support microphone access. Please try using Chrome, Firefox, or Safari.');
            break;
          case 'NotReadableError':
            setMicrophoneError('Microphone is being used by another application. Please close other apps using the microphone and try again.');
            break;
          default:
            setMicrophoneError(`Microphone error: ${error.message}. Please check your browser settings and try again.`);
        }
      } else if (error instanceof Error) {
        if (error.message.includes('Invalid API key')) {
          setAuthError('Invalid API key. Please check your ElevenLabs API key in the environment variables.');
        } else if (error.message.includes('Agent not found')) {
          setAuthError('Agent not found. Please verify your agent ID is correct.');
        } else if (error.message.includes('Access denied') || error.message.includes('insufficient permissions')) {
          setAuthError('Access denied. You may not have permission to access this agent, or it might be a private agent requiring special access.');
        } else if (error.message.includes('Rate limit') || error.message.includes('quota')) {
          setAuthError('API rate limit exceeded. Please wait a moment and try again, or check your ElevenLabs account quota.');
        } else if (error.message.includes('signed URL')) {
          setAuthError('Failed to get authorization. Please check your API credentials and agent configuration.');
        } else {
          setAuthError(`Connection error: ${error.message}. Please check your internet connection and try again.`);
        }
      } else {
        setAuthError('An unexpected error occurred. Please try again.');
      }
    }
  }, [conversation, agentId, apiKey]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      console.log('Conversation ended successfully');
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  }, [conversation]);

  const handleStartSession = () => {
    setIsActive(true);
    setTimeRemaining(duration);
  };

  const handlePauseSession = () => {
    setIsActive(false);
  };

  const handleStopSession = () => {
    setIsActive(false);
    setTimeRemaining(duration);
    setCycleProgress(0);
    setBreathPhase('inhale');
    onSessionEnd();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const dismissError = () => {
    setMicrophoneError(null);
    setAuthError(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingCircleScale = () => {
    if (!isActive) return 1;
    
    if (breathPhase === 'inhale') {
      const progress = (cycleProgress / breathCycle.inhale);
      return 1 + (progress * 0.5);
    } else if (breathPhase === 'hold') {
      return 1.5;
    } else {
      const progress = (cycleProgress - breathCycle.inhale - breathCycle.hold) / breathCycle.exhale;
      return 1.5 - (progress * 0.5);
    }
  };

  const getBreathingInstruction = () => {
    if (!isActive) return 'Ready to begin your breathing session';
    
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe in slowly...';
      case 'hold':
        return 'Hold your breath...';
      case 'exhale':
        return 'Breathe out gently...';
      default:
        return 'Follow the rhythm...';
    }
  };

  if (!apiKey || !agentId) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center">
        <div className="space-y-4">
          <Wind className="h-16 w-16 text-pink-500 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-800">AI Voice Guide Setup Required</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Please add your ElevenLabs API credentials to enable AI-guided breathing sessions.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left max-w-md mx-auto">
            <p className="text-sm font-medium text-gray-700 mb-2">Add to your .env file:</p>
            <code className="text-xs text-gray-600 block">
              VITE_ELEVENLABS_API_KEY=your_api_key_here<br/>
              VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl">
      {/* Authentication Error Alert */}
      {authError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 relative">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
              <h4 className="font-semibold text-red-800 mb-1">Authentication Error</h4>
              <p className="text-red-700 text-sm">{authError}</p>
              <div className="mt-3 text-xs text-red-600">
                <p className="font-medium mb-1">Common solutions:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Verify your ElevenLabs API key is correct and active</li>
                  <li>Check that your agent ID exists and you have access to it</li>
                  <li>Ensure you haven't exceeded your API quota or rate limits</li>
                  <li>For private agents, make sure you have proper permissions</li>
                  <li>Try creating a new API key in your ElevenLabs dashboard</li>
                </ul>
              </div>
            </div>
            <button
              onClick={dismissError}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Microphone Error Alert */}
      {microphoneError && (
        <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4 relative">
          <div className="flex items-start space-x-3">
            <Mic className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-orange-800 mb-1">Microphone Access Required</h4>
              <p className="text-orange-700 text-sm">{microphoneError}</p>
              <div className="mt-3 text-xs text-orange-600">
                <p className="font-medium mb-1">Troubleshooting steps:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Look for the microphone icon in your browser's address bar and click "Allow"</li>
                  <li>Try the "Request Microphone Permission" button below</li>
                  <li>Check your system microphone settings</li>
                  <li>Ensure no other applications are using your microphone</li>
                  <li>Try refreshing the page or using Chrome browser</li>
                </ul>
              </div>
            </div>
            <button
              onClick={dismissError}
              className="text-orange-400 hover:text-orange-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="text-center space-y-8">
        {/* Timer Display */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Timer className="h-6 w-6 text-pink-500" />
          <span className="text-2xl font-bold text-gray-800">
            {formatTime(timeRemaining)}
          </span>
          <span className="text-gray-600">
            / {formatTime(duration)}
          </span>
        </div>

        {/* Breathing Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div 
              className="w-48 h-48 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-2xl transition-transform duration-1000 ease-in-out flex items-center justify-center"
              style={{ 
                transform: `scale(${getBreathingCircleScale()})`,
              }}
            >
              <div className="text-white font-semibold text-lg">
                {breathPhase.charAt(0).toUpperCase() + breathPhase.slice(1)}
              </div>
            </div>
            
            {/* Connection status indicator */}
            <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${
              conversation.status === 'connected' ? 'bg-green-400 animate-pulse' : 
              conversation.status === 'connecting' ? 'bg-yellow-400 animate-pulse' :
              'bg-gray-400'
            }`} />
          </div>
        </div>

        {/* Breathing Instructions */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            {getBreathingInstruction()}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {isActive 
              ? 'Follow the circle and listen to your AI guide for the perfect breathing rhythm.'
              : 'Connect with your AI breathing coach to begin your personalized session.'
            }
          </p>
        </div>

        {/* AI Guide Status */}
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600">
            AI Guide Status: <span className={`font-semibold capitalize ${
              conversation.status === 'connected' ? 'text-green-600' :
              conversation.status === 'connecting' ? 'text-yellow-600' :
              conversation.status === 'disconnected' ? 'text-red-600' :
              'text-gray-600'
            }`}>{conversation.status}</span>
          </p>
          {conversation.status === 'connected' && (
            <p className="text-sm text-gray-600">
              Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}
            </p>
          )}
        </div>

        {/* Manual Permission Request Button */}
        {microphoneError && (
          <div className="flex justify-center">
            <button
              onClick={requestMicrophonePermission}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-all duration-200 shadow-lg"
            >
              <Mic className="h-4 w-4" />
              <span>Request Microphone Permission</span>
            </button>
          </div>
        )}

        {/* AI Guide Controls */}
        <div className="flex items-center justify-center space-x-4">
          {/* AI Connection Button */}
          <button
            onClick={conversation.status === 'connected' ? stopConversation : startConversation}
            disabled={conversation.status === 'connecting'}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              conversation.status === 'connected'
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                : conversation.status === 'connecting'
                ? 'bg-yellow-500 text-white shadow-lg cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
            }`}
          >
            <Wind className="h-5 w-5" />
            <span>
              {conversation.status === 'connected' 
                ? 'Disconnect AI Guide'
                : conversation.status === 'connecting'
                ? 'Connecting...'
                : 'Connect AI Guide'
              }
            </span>
          </button>

          {/* Mute Button */}
          {conversation.status === 'connected' && (
            <button
              className={`p-3 rounded-full transition-all duration-200 ${
                isMuted
                  ? 'bg-gray-500 hover:bg-gray-600 text-white'
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
              onClick={handleToggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
        </div>

        {/* Session Controls */}
        <div className="flex justify-center space-x-4 pt-4">
          {!isActive ? (
            <button
              onClick={handleStartSession}
              disabled={conversation.status !== 'connected'}
              className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-full transition-all duration-200 font-medium shadow-lg transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5" />
              <span>Start Breathing Session</span>
            </button>
          ) : (
            <>
              <button
                onClick={handlePauseSession}
                className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-lg"
              >
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </button>
              <button
                onClick={handleStopSession}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-lg"
              >
                <Square className="w-5 h-5" />
                <span>Stop</span>
              </button>
            </>
          )}
        </div>

        {/* Session Tips */}
        {!isActive && (
          <div className="mt-8 p-6 bg-pink-50 border border-pink-200 rounded-xl">
            <h4 className="font-semibold text-pink-800 mb-3">Session Tips</h4>
            <ul className="text-pink-700 text-sm space-y-2 text-left max-w-md mx-auto">
              <li>• Connect your AI guide first for personalized breathing instructions</li>
              <li>• Find a comfortable, quiet position</li>
              <li>• Focus on the expanding and contracting circle</li>
              <li>• Let the AI guide help you maintain the perfect rhythm</li>
              <li>• Don't worry if you miss a beat - just rejoin the flow</li>
            </ul>
          </div>
        )}

        {/* API Configuration Help */}
        {(authError || microphoneError) && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
            <div className="text-blue-700 text-sm space-y-2">
              <p><strong>API Key Issues:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Get your API key from <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noopener noreferrer" className="underline">ElevenLabs Settings</a></li>
                <li>Make sure it starts with "sk-" and is properly set in your .env file</li>
                <li>Check your account quota and billing status</li>
              </ul>
              
              <p className="mt-3"><strong>Agent ID Issues:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Find your agent ID in the <a href="https://elevenlabs.io/app/conversational-ai" target="_blank" rel="noopener noreferrer" className="underline">ElevenLabs Conversational AI dashboard</a></li>
                <li>Ensure the agent is published and accessible</li>
                <li>For private agents, make sure you have proper permissions</li>
              </ul>
            </div>
          </div>
        )}

        {/* Browser Compatibility Notice */}
        {microphoneError && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">Browser Compatibility</h4>
            <p className="text-green-700 text-sm mb-2">
              For the best experience, we recommend using:
            </p>
            <div className="flex justify-center space-x-4 text-xs text-green-600">
              <span>✓ Chrome (Recommended)</span>
              <span>✓ Firefox</span>
              <span>✓ Safari</span>
              <span>✓ Edge</span>
            </div>
            <p className="text-green-600 text-xs mt-2">
              Make sure your browser is up to date and supports WebRTC for real-time conversations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

