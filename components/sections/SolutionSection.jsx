"use client"

import { motion } from 'framer-motion'
import StepIndicator from '../ui/StepIndicator'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useLanguage } from '@/context/LanguageContext'

const SolutionSection = () => {
    const { t } = useLanguage()

    return (
        <section className="px-6 md:px-16 py-24" style={{ backgroundColor: 'var(--background)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Título centrado con animación */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 text-center mb-12"
                >
                    {t.solution.title}
                </motion.h2>

                {/* Step indicator */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <StepIndicator
                        number={t.solution.step}
                        line1={t.solution.line1}
                        line2="."
                        highlightedWord={t.solution.highlightedWord}
                        className="mb-20"
                    />
                </motion.div>

                {/* Grid: Dispositivos izquierda, Feature Cards derecha */}
                <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">

                    {/* Columna izquierda: Dispositivos */}
                    <div className="relative flex justify-center lg:justify-start">

                        {/* Laptop mockup con animación optimizada */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            viewport={{ amount: 0.3, once: true }}
                            className="relative z-10 w-full max-w-2xl"
                        >
                            <img
                                src="/solution/laptop.png"
                                alt={t.solution.altLaptop}
                                className="w-full h-auto drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-700"
                                loading="lazy"
                            />
                        </motion.div>

                        {/* iPhone mockup con flotación optimizada */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                            viewport={{ amount: 0.3, once: true }}
                            className="hidden lg:block absolute -bottom-12 -right-24 z-20 w-48 xl:w-56"
                            style={{
                                transform: 'rotate(-5deg)',
                                willChange: 'transform'
                            }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -12, 0],
                                    transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <img
                                    src="/solution/iphone.png"
                                    alt={t.solution.altIphone}
                                    className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                    loading="lazy"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Columna derecha: Feature Cards con shadcn y animaciones */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="group"
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                <CardHeader className="p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shrink-0 group-hover:scale-110 transition-transform duration-500">
                                            <svg
                                                className="w-8 h-8"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <CardTitle className="text-xl font-bold text-gray-900">{t.solution.feature1.title}</CardTitle>
                                            <CardDescription className="text-base text-gray-600 leading-relaxed font-medium">
                                                {t.solution.feature1.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="group"
                        >
                            <Card className="bg-white/80 backdrop-blur-sm border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                <CardHeader className="p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0 group-hover:scale-110 transition-transform duration-500">
                                            <svg
                                                className="w-8 h-8"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <CardTitle className="text-xl font-bold text-gray-900">{t.solution.feature2.title}</CardTitle>
                                            <CardDescription className="text-base text-gray-600 leading-relaxed font-medium">
                                                {t.solution.feature2.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SolutionSection;
