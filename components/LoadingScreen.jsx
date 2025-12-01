"use client"

import { useEffect } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
    useEffect(() => {
        // Auto-completar después de 2.5 segundos
        const timer = setTimeout(onComplete, 2500)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-9xl md:text-[12rem] font-bold tracking-tight text-gray-300"
                style={{ fontFamily: 'var(--font-heading)' }}
                animate={{
                    opacity: [0.2, 1, 0.2],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                RV
            </motion.h1>
        </motion.div>
    )
}

export default LoadingScreen;
