"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'

const StepIndicator = ({ number, line1, line2, highlightedWord, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Siempre actualizar el estado según la visibilidad
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.3 }
        )

        observer.observe(element)
        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, []) // Array de dependencias vacío es correcto aquí

    return (
        <div ref={ref} className={className}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #020073 0%, #E6FFFE 100%)' }}
            >
                {/* Sin número en el cuadrado */}
            </motion.div>

            {/* Primera línea */}
            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-lg text-gray-400 font-medium">{number}</span>
                <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)', color: '#000000' }}>
                    <TypewriterText text={line1} delay={300} speed={25} showCursor={false} startNow={isVisible} />
                </h2>
            </div>

            {/* Segunda línea con palabra destacada */}
            <div className="flex items-baseline gap-2">
                <span className="text-lg text-gray-400 font-medium">{String(Number(number) + 1).padStart(2, '0')}</span>
                <h3 className="text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span style={{
                        color: 'var(--foreground)',
                        textDecoration: 'underline',
                        textDecorationColor: 'var(--foreground)',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '4px'
                    }}>
                        <TypewriterText text={highlightedWord} delay={300 + (line1.length * 25) + 100} speed={25} showCursor={false} startNow={isVisible} />
                    </span>
                    {line2 && (
                        <span style={{ color: '#000000' }}>
                            <TypewriterText text={line2} delay={300 + (line1.length * 25) + 100 + (highlightedWord.length * 25)} speed={25} showCursor={true} startNow={isVisible} />
                        </span>
                    )}
                </h3>
            </div>
        </div>
    )
}

export default StepIndicator;
