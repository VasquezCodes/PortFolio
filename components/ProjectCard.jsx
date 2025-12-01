"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

import { useLanguage } from '@/context/LanguageContext'

const ProjectCard = ({ title, slides, tags, link, color }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const { t } = useLanguage()

    // Auto-advance carousel with random start delay to prevent synchronized lag
    useEffect(() => {
        if (!slides || slides.length <= 1) return;

        let interval;
        const startTimer = () => {
            interval = setInterval(() => {
                setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
            }, 5000)
        }

        if (!isHovered) {
            // Add a random delay between 0-2000ms when mounting to desync carousels
            const randomDelay = Math.random() * 2000;
            const timeout = setTimeout(startTimer, randomDelay);
            return () => {
                clearTimeout(timeout);
                clearInterval(interval);
            }
        }

        return () => clearInterval(interval)
    }, [slides?.length, isHovered])

    const nextSlide = (e) => {
        e?.stopPropagation()
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = (e) => {
        e?.stopPropagation()
        setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const renderSlideContent = (slide) => {
        if (slide.type === 'combined') {
            return (
                <div className="relative w-full h-full flex items-center justify-center will-change-transform">
                    {/* Desktop Image - Base */}
                    <div className="relative w-[75%] z-10 transform -translate-x-4 -translate-y-2">
                        <img
                            src={slide.desktop}
                            alt={`${title} Desktop`}
                            className="w-full h-auto object-contain drop-shadow-2xl rounded-lg"
                            loading="eager"
                        />
                    </div>
                    {/* Mobile Image - Overlay */}
                    <div className="absolute right-4 bottom-4 w-[20%] z-20 transform -translate-y-2">
                        <img
                            src={slide.mobile}
                            alt={`${title} Mobile`}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                            loading="eager"
                        />
                    </div>
                </div>
            )
        } else if (slide.type === 'collage') {
            if (slide.layout === 'stack') {
                return (
                    <div className="w-full h-full p-4 flex flex-col gap-3 overflow-hidden will-change-transform">
                        <div className="relative h-[55%] w-full rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                            <img
                                src={slide.images[0]}
                                alt={`${title} Design 1`}
                                className="w-full h-full object-cover"
                                loading="eager"
                            />
                        </div>
                        <div className="flex h-[45%] gap-3">
                            {slide.images.slice(1).map((img, idx) => (
                                <div key={idx} className="relative w-1/2 h-full rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={img}
                                        alt={`${title} Design ${idx + 2}`}
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            return (
                <div className="w-full h-full p-4 grid grid-cols-2 gap-3 overflow-hidden will-change-transform">
                    {slide.images.map((img, idx) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 first:row-span-2 first:h-full">
                            <img
                                src={img}
                                alt={`${title} Design ${idx + 1}`}
                                className="w-full h-full object-cover"
                                loading="eager"
                            />
                        </div>
                    ))}
                </div>
            )
        } else {
            // Fallback for simple image strings if any remain
            return (
                <img
                    src={slide}
                    alt={`${title} preview`}
                    className="max-h-full max-w-[90%] object-contain drop-shadow-xl will-change-transform"
                    loading="eager"
                />
            )
        }
    }

    return (
        <div
            className="group relative p-6 h-[450px] w-full flex flex-col transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Blob - Mesh Gradient Effect */}
            <div className="absolute inset-0 z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80 blur-[80px]"
                style={{ background: color || 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
            />

            {/* Header */}
            <div className="flex justify-between items-start z-30 relative mb-4">
                <h3 className="text-xl font-medium text-gray-900">{title}</h3>
            </div>

            {/* Carousel Container */}
            <div className="relative flex-grow w-full rounded-xl group/carousel overflow-hidden mb-16 z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlideIndex}
                        className="w-full h-full flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {renderSlideContent(slides[currentSlideIndex])}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows (visible on hover) */}
                {slides.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 hover:scale-110 backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-800" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 hover:scale-110 backdrop-blur-sm"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-800" />
                        </button>
                    </>
                )}
            </div>

            {/* Visit Website Button - Fixed at bottom left */}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-8 left-8 bg-white/90 hover:bg-white text-gray-900 px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300 z-40 flex items-center gap-2 hover:scale-105 text-sm backdrop-blur-sm border border-gray-100"
            >
                {t.projects.visitWebsite}
                <ArrowUpRight className="w-4 h-4" />
            </a>
        </div>
    )
}

export default ProjectCard
