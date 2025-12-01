"use client"

import StepIndicator from '../ui/StepIndicator'
import { useLanguage } from '@/context/LanguageContext'

const ProcessSection = ({ onOpenContact }) => {
    const { t } = useLanguage()

    return (
        <section id="process" className="min-h-[100dvh] px-4 md:px-16 py-32 relative" style={{ backgroundColor: 'var(--background)' }}>

            {/* Step indicator con typewriter effect */}
            <StepIndicator
                number={t.process.step}
                line1={t.process.line1}
                line2="..."
                highlightedWord={t.process.highlightedWord}
                className="mb-32"
            />

            {/* Chat Messages - SMS Style */}
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Message 1 - Client */}
                <div className="story-text chat-message-1 flex justify-start">
                    <div className="max-w-2xl">
                        <div className="bg-gray-200 rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm">
                            <span className="text-base leading-relaxed text-gray-900" style={{ fontFamily: 'var(--font-body)' }} dangerouslySetInnerHTML={{ __html: t.process.message1 }} />
                        </div>
                        <div className="flex items-center gap-2 mt-2 px-2">
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                                👤
                            </div>
                            <span className="text-xs text-gray-500">{t.process.client}</span>
                        </div>
                    </div>
                </div>

                {/* Message 1b - Client */}
                <div className="story-text chat-message-1 flex justify-start">
                    <div className="max-w-3xl">
                        <div className="bg-gray-200 rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm">
                            <span className="text-base leading-relaxed text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                                {t.process.message1b}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Message 2 - You */}
                <div className="story-text chat-message-2 flex justify-end">
                    <div className="max-w-2xl">
                        <div className="rounded-3xl rounded-tr-sm px-6 py-4 shadow-md" style={{ backgroundColor: 'var(--foreground)' }}>
                            <span className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--background)' }}>
                                {t.process.message2}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 px-2 justify-end">
                            <span className="text-xs text-gray-500">{t.process.you}</span>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--foreground)' }}>
                                💻
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message 2b - You */}
                <div className="story-text chat-message-2 flex justify-end">
                    <div className="max-w-3xl">
                        <div className="rounded-3xl rounded-tr-sm px-6 py-4 shadow-md" style={{ backgroundColor: 'var(--foreground)' }}>
                            <span className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--background)' }} dangerouslySetInnerHTML={{ __html: t.process.message2b }} />
                        </div>
                    </div>
                </div>

                {/* Message 3 - Client */}
                <div className="story-text chat-message-3 flex justify-start">
                    <div className="max-w-xl">
                        <div className="bg-gray-200 rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm">
                            <span className="text-base leading-relaxed text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                                {t.process.message3}
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="cta-button flex justify-center pt-20">
                    <button
                        onClick={onOpenContact}
                        className="w-full md:w-auto px-8 md:px-16 py-6 rounded-full text-xl font-semibold transition-all flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                        style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                    >
                        <span>{t.process.cta}</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default ProcessSection;
