import React from 'react';

const PlaybackControls = ({ isPlaying, onTogglePlay, onNext, onPrev, currentStep, totalSteps }) => {
    return (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <button
                    onClick={onPrev}
                    disabled={currentStep <= 1}
                    className="p-2 text-surface-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={onTogglePlay}
                    className="p-3 bg-primary-600 hover:bg-primary-500 rounded-full text-white shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                    )}
                </button>

                <button
                    onClick={onNext}
                    disabled={currentStep >= totalSteps}
                    className="p-2 text-surface-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col items-center min-w-[80px]">
                <span className="text-[10px] text-surface-500 font-bold uppercase tracking-widest">Step</span>
                <span className="text-sm font-mono text-surface-300">
                    {currentStep} / {totalSteps || '?'}
                </span>
            </div>

            <div className="w-32 h-1 bg-surface-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default PlaybackControls;
