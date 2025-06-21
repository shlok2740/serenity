import React, { useState, useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { Play, Square, Loader2, AlertCircle, Settings } from 'lucide-react';
import { createConversation, endConversation } from '../../api/Tavus';
import { IConversation, CVIState } from '../../types';

interface CVIMeetingProps {
  apiToken: string;
  personaId?: string;
}

export const CVIMeeting: React.FC<CVIMeetingProps> = ({ 
  apiToken, 
  personaId 
}) => {
  const [state, setState] = useState<CVIState>({
    isConnected: false,
    isLoading: false,
    error: null,
    conversation: null,
  });

  const callFrameRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startConversation = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Create conversation
      const conversation = await createConversation(apiToken, personaId);
      
      setState(prev => ({ ...prev, conversation }));

      // Initialize Daily call frame
      if (containerRef.current) {
        callFrameRef.current = DailyIframe.createFrame(containerRef.current, {
          iframeStyle: {
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px',
          },
          showLeaveButton: false,
          showFullscreenButton: false,
        });

        // Set up event listeners
        callFrameRef.current
          .on('joined-meeting', () => {
            setState(prev => ({ ...prev, isConnected: true, isLoading: false }));
          })
          .on('left-meeting', () => {
            setState(prev => ({ ...prev, isConnected: false }));
          })
          .on('error', (error: any) => {
            setState(prev => ({ 
              ...prev, 
              error: error.message || 'Connection error occurred',
              isLoading: false 
            }));
          });

        // Join the conversation
        await callFrameRef.current.join({ url: conversation.conversation_url });
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to start conversation',
        isLoading: false 
      }));
    }
  };

  const stopConversation = async () => {
    try {
      // Leave the Daily call
      if (callFrameRef.current) {
        await callFrameRef.current.leave();
        callFrameRef.current.destroy();
        callFrameRef.current = null;
      }

      // End the conversation via API
      if (state.conversation) {
        await endConversation(state.conversation.conversation_id, apiToken);
      }

      setState({
        isConnected: false,
        isLoading: false,
        error: null,
        conversation: null,
      });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to end conversation'
      }));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">AI Therapy Session</h2>
            <p className="text-blue-100 mt-1">
              {state.isConnected ? 'Connected - Your AI coach is ready' : 'Ready to connect with your AI coach'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              state.isConnected ? 'bg-green-400' : 'bg-gray-300'
            }`} />
            <span className="text-white text-sm font-medium">
              {state.isConnected ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative">
        <div 
          ref={containerRef}
          className="w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center"
        >
          {!state.isConnected && !state.isLoading && (
            <div className="text-center text-white space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to start your session?</h3>
                <p className="text-gray-300">Your AI coach is waiting to help you</p>
              </div>
            </div>
          )}
          
          {state.isLoading && (
            <div className="text-center text-white space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Connecting...</h3>
                <p className="text-gray-300">Setting up your therapy session</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {!state.isConnected ? (
              <button
                onClick={startConversation}
                disabled={state.isLoading}
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-lg transform hover:scale-105 disabled:transform-none"
              >
                  <Play className="w-5 h-5" />               
                <span>Start Therapy Session</span>
              </button>
            ) : (
              <button
                onClick={stopConversation}
                className="flex items-center space-x-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
              >
                <Square className="w-5 h-5" />
                <span>End Session</span>
              </button>
            )}
          </div>

          {/* Session Info */}
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {state.conversation ? `Session ID: ${state.conversation.conversation_id.slice(0, 8)}...` : 'No active session'}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {state.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Connection Error</p>
              <p className="text-red-600 text-sm mt-1">{state.error}</p>
              <button 
                onClick={() => setState(prev => ({ ...prev, error: null }))}
                className="text-red-600 text-sm underline mt-2 hover:text-red-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Session Tips */}
        {!state.isConnected && !state.error && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">Session Tips</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Find a quiet, private space for your session</li>
              <li>• Ensure your camera and microphone are working</li>
              <li>• Speak naturally - your AI coach understands emotions</li>
              <li>• Take your time - there's no rush in therapy</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};