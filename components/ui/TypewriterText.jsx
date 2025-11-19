"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TypewriterText = ({ text, delay = 0, speed = 50, showCursor = true, startNow = false }) => {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        // Reset cuando cambia startNow
        if (!startNow) {
            setDisplayedText('')
            setCurrentIndex(0)
            setIsComplete(false)
            setHasStarted(false)
            return
        }

        if (!hasStarted && startNow) {
            // Esperar el delay inicial antes de empezar
            const startTimer = setTimeout(() => {
                setHasStarted(true)
            }, delay)
            return () => clearTimeout(startTimer)
        }

        if (!hasStarted) return

        // Escribir el texto carácter por carácter
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, speed)

            return () => clearTimeout(timer)
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true)
        }
    }, [currentIndex, text, delay, speed, isComplete, hasStarted, startNow])

    return (
        <span className="inline-flex items-center">
            <span>{displayedText}</span>
            {showCursor && !isComplete && hasStarted && (
                <motion.span
                    className="inline-block w-[3px] h-[0.9em] bg-current ml-[3px] -mb-[0.1em]"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.5, 0.5, 1]
                    }}
                />
            )}
        </span>
    );
};

export default TypewriterText;
