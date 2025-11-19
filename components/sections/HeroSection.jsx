"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TypewriterText from '../ui/TypewriterText'

const HeroSection = ({ isLoading }) => {
    const [animationStage, setAnimationStage] = useState(-1) // -1: nada, 0: line1, 1: line2, 2: line3, 3: reveal
    const [showFinalHero, setShowFinalHero] = useState(false)

    // Secuencia de animación cinematográfica - SOLO DESPUÉS DEL LOADING
    useEffect(() => {
        // Solo iniciar la animación si ya no está cargando
        if (!isLoading) {
            const timer0 = setTimeout(() => setAnimationStage(0), 200)     // Mostrar line 1
            const timer1 = setTimeout(() => setAnimationStage(1), 1500)    // Después de line 1
            const timer2 = setTimeout(() => setAnimationStage(2), 2800)    // Después de line 2
            const timer3 = setTimeout(() => setAnimationStage(3), 3700)    // Después de line 3
            const timer4 = setTimeout(() => setShowFinalHero(true), 4500)  // Mostrar hero final

            return () => {
                clearTimeout(timer0)
                clearTimeout(timer1)
                clearTimeout(timer2)
                clearTimeout(timer3)
                clearTimeout(timer4)
            }
        }
    }, [isLoading])

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center px-16 py-20 relative overflow-hidden">

            {/* Gradient fade effect at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-100/60 via-purple-100/40 to-transparent pointer-events-none"></div>

            <div className="max-w-5xl relative z-10 w-full mx-auto flex justify-center items-center pl-20">{/* Centrado mejorado con padding left */}

                {/* ANIMACIÓN CINEMATOGRÁFICA */}
                <AnimatePresence mode="wait">
                    {!showFinalHero ? (
                        <motion.div
                            key="cinematic"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="cinematic-container w-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                    animationStage === 0 ? { opacity: 1, scale: 1, y: 0 } :
                                        animationStage === 1 ? { opacity: 1, scale: 1, y: -80 } :
                                            animationStage === 2 ? { opacity: 1, scale: 1, y: -160 } :
                                                { opacity: 0, scale: 1, y: -240 }
                                }
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="blue-square mb-8"
                            ></motion.div>

                            {/* Línea 01 */}
                            {animationStage >= 0 && (
                                <motion.div
                                    className="line flex items-start gap-6 mb-4"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={
                                        animationStage === 0 ? { opacity: 1, y: 0 } :
                                            animationStage === 1 ? { opacity: 1, y: -80 } :
                                                animationStage === 2 ? { opacity: 1, y: -160 } :
                                                    { opacity: 0, y: -240 }
                                    }
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <span className="text-sm text-gray-400 pt-2">01</span>
                                    <div className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <span className="inline-flex gap-2 flex-wrap items-baseline">
                                            <span className="text-gray-400 font-light">&lt;</span>
                                            <TypewriterText text="Hello, I'm " delay={300} speed={60} showCursor={true} startNow={animationStage >= 0} />
                                            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                                                <TypewriterText text="Robert!" delay={1000} speed={60} showCursor={false} startNow={animationStage >= 0} />
                                            </span>
                                            <span className="text-gray-400 font-light">&gt;</span>
                                        </span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Línea 02 */}
                            {animationStage >= 1 && (
                                <motion.div
                                    className="line flex items-start gap-6 mb-4"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={
                                        animationStage === 1 ? { opacity: 1, y: 0 } :
                                            animationStage === 2 ? { opacity: 1, y: -80 } :
                                                { opacity: 0, y: -160 }
                                    }
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <span className="text-sm text-gray-400 pt-2">02</span>
                                    <div className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <span className="inline-flex gap-3 items-center flex-wrap">
                                            <span className="text-gray-400 font-light">&lt;</span>
                                            <TypewriterText text="I " delay={300} speed={60} showCursor={true} startNow={animationStage >= 1} />
                                            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                                                <TypewriterText text="design" delay={600} speed={60} showCursor={false} startNow={animationStage >= 1} />
                                            </span>
                                            <motion.svg initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.3 }} className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </motion.svg>
                                            <TypewriterText text=" and " delay={1000} speed={60} showCursor={true} startNow={animationStage >= 1} />
                                            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                                                <TypewriterText text="develop" delay={1300} speed={60} showCursor={false} startNow={animationStage >= 1} />
                                            </span>
                                            <motion.svg initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, duration: 0.3 }} className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </motion.svg>
                                        </span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Línea 03 */}
                            {animationStage >= 2 && (
                                <motion.div
                                    className="line flex items-start gap-6 mb-8"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={
                                        animationStage === 2 ? { opacity: 1, y: 0 } :
                                            { opacity: 0, y: -80 }
                                    }
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <span className="text-sm text-gray-400 pt-2">03</span>
                                    <div className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                                        <span className="inline-flex gap-2 flex-wrap items-baseline">
                                            <TypewriterText text="websites." delay={300} speed={60} showCursor={true} startNow={animationStage >= 2} />
                                            <span className="text-gray-400 font-light">&gt;</span>
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        // HERO FINAL - Estado estático y centrado
                        <motion.div
                            key="final-hero"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="blue-square mb-8"
                            ></motion.div>

                            <div className="line flex items-start gap-6 mb-4">
                                <span className="text-sm text-gray-400 pt-2">01</span>
                                <h1 className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                                    <span className="text-gray-400 font-light">&lt;</span>
                                    <span>Hello, </span>
                                    <span>I'm </span>
                                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Robert</span>
                                    <span>!</span>
                                    <span className="text-gray-400 font-light">&gt;</span>
                                </h1>
                            </div>

                            <div className="line flex items-start gap-6 mb-4">
                                <span className="text-sm text-gray-400 pt-2">02</span>
                                <h1 className="text-4xl md:text-6xl font-light flex flex-wrap items-center gap-3" style={{ fontFamily: 'var(--font-heading)' }}>
                                    <span className="text-gray-400 font-light">&lt;</span>
                                    <span>I</span>
                                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>design</span>
                                    <svg className="w-8 h-8 text-gray-600 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <span>and</span>
                                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>develop</span>
                                    <svg className="w-8 h-8 text-gray-600 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </h1>
                            </div>

                            <div className="line flex items-start gap-6 mb-8">
                                <span className="text-sm text-gray-400 pt-2">03</span>
                                <h1 className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                                    <span>websites.</span>
                                    <span className="text-gray-400 font-light">&gt;</span>
                                </h1>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Scroll indicator - Solo aparece cuando la animación termina */}
            {showFinalHero && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors z-20"
                >
                    <span className="text-sm">Learn more</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.button>
            )}
        </section>
    )
}

export default HeroSection;
