"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import StepIndicator from '../ui/StepIndicator'
import CodeWindow from '../ui/CodeWindow'
import LivePreview from '../ui/LivePreview'
import { useLanguage } from '@/context/LanguageContext'

const DevelopmentSection = () => {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [startAnimation, setStartAnimation] = useState(false)
    const [currentStep, setCurrentStep] = useState(0) // 0: Start, 1: Navbar, 2: Hero, 3: Grid, 4: Newsletter
    const containerRef = useRef(null)
    const isDragging = useRef(false)
    const { t } = useLanguage()

    const handleStepComplete = (step) => {
        setCurrentStep(prev => Math.max(prev, step))
    }

    const handleMouseDown = () => {
        isDragging.current = true
        document.body.style.cursor = 'col-resize'
    }

    const handleMouseUp = () => {
        isDragging.current = false
        document.body.style.cursor = 'default'
    }

    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = Math.min(Math.max((x / rect.width) * 100, 10), 90)
        setSliderPosition(percentage)
    }

    const handleTouchMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const percentage = Math.min(Math.max((x / rect.width) * 100, 10), 90)
        setSliderPosition(percentage)
    }

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <section className="px-6 md:px-16 py-24 md:py-48 mt-20 md:mt-32" style={{ backgroundColor: 'var(--background)' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    onViewportEnter={() => setStartAnimation(true)}
                    className="mb-12 md:mb-16"
                >
                    <StepIndicator
                        number={t.development.step}
                        line1={t.development.line1}
                        line2="!"
                        highlightedWord={t.development.highlightedWord}
                    />
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    <div className="w-full lg:w-1/3 space-y-6 md:space-y-8 text-center lg:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                            {t.development.title.prefix} <span className="text-gray-400 font-mono">{t.development.title.code}</span> {t.development.title.middle} <span className="text-orange-500">{t.development.title.suffix}</span>
                        </h3>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {t.development.cleanArch}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                {t.development.interactiveUI}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3">
                        <div
                            ref={containerRef}
                            className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-900 bg-[#1e1e1e] flex"
                            onTouchMove={handleTouchMove}
                        >
                            <div className="h-full overflow-hidden relative" style={{ width: `${sliderPosition}%` }}>
                                <CodeWindow startAnimation={startAnimation} onStepComplete={handleStepComplete} />
                            </div>

                            <div
                                className="w-1 bg-white cursor-col-resize z-20 relative flex items-center justify-center hover:bg-orange-500 transition-colors"
                                onMouseDown={handleMouseDown}
                            >
                                <div className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-30 pointer-events-none text-gray-900">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>
                            </div>

                            <div className="h-full overflow-hidden bg-white relative" style={{ width: `${100 - sliderPosition}%` }}>
                                <LivePreview currentStep={currentStep} />
                            </div>

                            {sliderPosition === 50 && !isDragging.current && (
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-xs font-medium pointer-events-none animate-pulse z-40">
                                    {t.development.dragResize}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DevelopmentSection;
