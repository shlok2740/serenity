import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, CheckCircle, Brain, Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';

const Reset: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = "https://gyiqqlfyuahnvxizkwaw.supabase.co/storage/v1/object/sign/dailyreset/ElevenLabs_2025-06-18T09_31_09_Jane%20-%20Professional%20Audiobook%20Reader_pvc_sp100_s40_sb40_v3.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYzkyM2MxNy04MjU1LTQwNDUtOTcwNi00ZGU1OTA3NDE2ZGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYWlseXJlc2V0L0VsZXZlbkxhYnNfMjAyNS0wNi0xOFQwOV8zMV8wOV9KYW5lIC0gUHJvZmVzc2lvbmFsIEF1ZGlvYm9vayBSZWFkZXJfcHZjX3NwMTAwX3M0MF9zYjQwX3YzLm1wMyIsImlhdCI6MTc1MDIzOTQyOCwiZXhwIjoxNzgxNzc1NDI4fQ.npkVf4jfdVGTJsjD3fGymLTVeSHb58IQlWKk5lYHL9w";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsCompleted(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          to="/serene" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Go Back</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-green-400 to-pink-500 rounded-full">
              <RotateCcw className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
            Daily Reset
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start your day with a guided mental clarity meditation to refresh your mind and set positive intentions.
          </p>
        </div>

        {/* Mental Clarity Meditation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl mb-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-green-100 rounded-full">
                  <Brain className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-semibold text-gray-800">Mental Clarity Meditation</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A guided meditation to clear mental clutter and create space for new intentions. Let the soothing voice guide you through a journey of inner peace and mental clarity.
              </p>
            </div>

            {/* Audio Player */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <audio ref={audioRef} src={audioUrl} preload="metadata" />
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>

                <button
                  onClick={stopAudio}
                  className="flex items-center justify-center w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-all duration-200"
                >
                  <Square className="w-6 h-6" />
                </button>

                <button
                  onClick={toggleMute}
                  className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-200"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Status */}
              <div className="mt-6 text-center">
                {isCompleted ? (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-semibold">Meditation completed! Well done.</span>
                  </div>
                ) : isPlaying ? (
                  <p className="text-green-700 font-medium">Meditation in progress... Find your center.</p>
                ) : (
                  <p className="text-gray-600">Ready to begin your mental clarity journey</p>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-green-200">
              <div className="text-center space-y-2">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Mental Clarity</h4>
                <p className="text-sm text-gray-600">Clear mental fog and enhance focus</p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 bg-emerald-100 rounded-full w-fit mx-auto">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Stress Relief</h4>
                <p className="text-sm text-gray-600">Release tension and find inner peace</p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                  <RotateCcw className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Daily Reset</h4>
                <p className="text-sm text-gray-600">Start fresh with renewed energy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
          <h4 className="font-semibold text-gray-800 mb-4">Today's Reset Progress</h4>
          <div className="flex justify-center">
            <div className="text-center">
              {isCompleted ? (
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              ) : (
                <div className="h-12 w-12 border-2 border-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <p className="text-sm text-gray-600">Mental Clarity Meditation</p>
            </div>
          </div>
          {isCompleted && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-800 font-medium">🎉 Congratulations!</p>
              <p className="text-green-700 text-sm mt-1">
                You've completed your daily reset meditation. Your mind is now clear and ready for the day ahead.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reset;