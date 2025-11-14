"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// --- Componente para el efecto Typewriter con Cursor Parpadeante ---
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

// --- Componente de Loading Screen Simple ---
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    // Auto-completar después de 2.5 segundos
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
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

// --- Componente Step Indicator con Typewriter ---
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

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [animationStage, setAnimationStage] = useState(-1) // -1: nada, 0: line1, 1: line2, 2: line3, 3: reveal
  const [showFinalHero, setShowFinalHero] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // (Limpiado: refs y animaciones GSAP de la sección Solution removidos)

  useEffect(() => {
    // Animaciones de scroll para los mensajes de chat
    gsap.utils.toArray('.chat-message-1, .chat-message-2, .chat-message-3').forEach((element) => {
      const direction = element.classList.contains('chat-message-2') ? 80 : -80
      gsap.fromTo(element,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    })

    // Animación para el botón CTA
    gsap.fromTo('.cta-button',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cta-button',
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )

    // Otras animaciones de scroll
    gsap.utils.toArray('.story-text').forEach((element, index) => {
      const direction = index % 2 === 0 ? -80 : 80
      gsap.fromTo(element,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    })

    gsap.utils.toArray('.case-card').forEach((element) => {
      gsap.fromTo(element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1
          }
        }
      )
    })

    gsap.fromTo('.project-card',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 70%',
        }
      }
    )

  }, [])

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

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-0 h-screen w-80 border-r z-50 flex flex-col justify-between p-8" style={{ backgroundColor: 'var(--light-gray)', borderColor: 'var(--medium-gray)' }}>

        {/* Logo / Profile */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold mb-8 shadow-lg" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
            RV
          </div>
          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Roberto Vasquez</h2>
          <p className="text-sm text-gray-500 mb-6">Buenos Aires, AR</p>

          {/* Navigation Menu */}
          <nav className="w-full space-y-2">
            <button
              onClick={() => scrollToSection('home')}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-semibold"
              style={{
                backgroundColor: activeSection === 'home' ? 'var(--foreground)' : 'transparent',
                color: activeSection === 'home' ? 'var(--background)' : 'var(--gray)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-semibold"
              style={{
                backgroundColor: activeSection === 'projects' ? 'var(--foreground)' : 'transparent',
                color: activeSection === 'projects' ? 'var(--background)' : 'var(--gray)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Projects</span>
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-semibold"
              style={{
                backgroundColor: activeSection === 'about' ? 'var(--foreground)' : 'transparent',
                color: activeSection === 'about' ? 'var(--background)' : 'var(--gray)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>About Me</span>
            </button>
          </nav>

          {/* Language Selector */}
          <div className="mt-8 flex items-center gap-2 text-sm">
            <button className="font-bold" style={{ color: 'var(--foreground)' }}>EN</button>
            <span className="text-gray-400">/</span>
            <button className="text-gray-400" style={{ hover: 'var(--foreground)' }}>FR</button>
          </div>
        </div>

        {/* Contact Info & Social Links */}
        <div>
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500 mb-1">Contacto</p>
            <a href="tel:+541136093041" className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              +54 11 3609-3041
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 transition-all" style={{ backgroundColor: 'var(--medium-gray)' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 transition-all" style={{ backgroundColor: 'var(--medium-gray)' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 transition-all" style={{ backgroundColor: 'var(--medium-gray)' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - with left margin for sidebar */}
      <main className="ml-80 text-gray-900" style={{ backgroundColor: 'var(--background)' }}>

        {/* WORK WITH ME BUTTON - Fixed top right */}
        <button className="fixed top-8 right-8 z-40 px-6 py-3 font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
          <span>Work with me</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* SECTION 1: HERO CON ANIMACIÓN CINEMATOGRÁFICA */}
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
                          <motion.svg initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} transition={{delay: 0.9, duration: 0.3}} className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </motion.svg>
                          <TypewriterText text=" and " delay={1000} speed={60} showCursor={true} startNow={animationStage >= 1} />
                          <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                            <TypewriterText text="develop" delay={1300} speed={60} showCursor={false} startNow={animationStage >= 1} />
                          </span>
                          <motion.svg initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} transition={{delay: 1.8, duration: 0.3}} className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* SECTION 2: STEP BY STEP PROCESS */}
        <section id="process" className="min-h-screen px-16 py-32 relative" style={{ backgroundColor: 'var(--background)' }}>

          {/* Step indicator con typewriter effect */}
          <StepIndicator
            number="01"
            line1="First, we need an"
            line2="..."
            highlightedWord="idea"
            className="mb-32"
          />

          {/* Chat Messages - SMS Style */}
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Message 1 - Client */}
            <div className="story-text chat-message-1 flex justify-start">
              <div className="max-w-2xl">
                <div className="bg-gray-200 rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm">
                  <span className="text-base leading-relaxed text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                    I need a <span className="font-semibold">modern website</span> for my company, something professional.
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 px-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                    👤
                  </div>
                  <span className="text-xs text-gray-500">Client</span>
                </div>
              </div>
            </div>

            {/* Message 1b - Client */}
            <div className="story-text chat-message-1 flex justify-start">
              <div className="max-w-3xl">
                <div className="bg-gray-200 rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm">
                  <span className="text-base leading-relaxed text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                    We're a boutique coffee roastery selling specialty beans online. Need e-commerce, blog, and a clean aesthetic.
                  </span>
                </div>
              </div>
            </div>

            {/* Message 2 - You */}
            <div className="story-text chat-message-2 flex justify-end">
              <div className="max-w-2xl">
                <div className="rounded-3xl rounded-tr-sm px-6 py-4 shadow-md" style={{ backgroundColor: 'var(--foreground)' }}>
                  <span className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--background)' }}>
                    Perfect, I love coffee projects!
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 px-2 justify-end">
                  <span className="text-xs text-gray-500">You</span>
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
                  <span className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--background)' }}>
                    I'll start with a complete <span className="font-semibold">design mockup</span>. Once approved, I'll <span className="font-semibold">develop the website</span> with e-commerce integration and deploy it!
                  </span>
                </div>
              </div>
            </div>

            {/* Message 3 - Client */}
            <div className="story-text chat-message-3 flex justify-start">
              <div className="max-w-xl">
                <div className="bg-gray-200 rounded-3xl rounded-tl-sm px-6 py-4 shadow-sm">
                  <span className="text-base leading-relaxed text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                    Excellent! When do we start? ☕
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="cta-button flex justify-center pt-20">
              <button className="px-16 py-6 rounded-full text-xl font-semibold transition-all flex items-center gap-4 shadow-xl hover:shadow-2xl" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
                <span>Now!</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

          </div>
        </section>

        {/* SECTION 2.5: ANALYSIS STEP */}
        <section className="min-h-screen px-16 py-32 relative" style={{ backgroundColor: 'var(--background)' }}>

          {/* Step indicator 03 - Analysis */}
          <StepIndicator
            number="03"
            line1="Then an analysis and a"
            line2="..."
            highlightedWord="direction"
            className="mb-32"
          />

          {/* Analysis cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="case-card transition-all duration-500 hover:scale-105">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <img src="/items/market.svg" alt="Market analysis" className="w-12 h-12" />
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Market analysis</CardTitle>
                    <CardDescription>
                      Competitors mainly target coffee enthusiasts with technical content. Additionally, their websites are mostly very text-heavy: minimal visuals, rather "corporate", especially when sustainability is emphasized.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="case-card transition-all duration-500 hover:scale-105">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <img src="/items/problem.svg" alt="Problem" className="w-12 h-12" />
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Problem</CardTitle>
                    <CardDescription>
                      The target audience is broad. Therefore, we must appeal to casual coffee drinkers without losing the audience defined as "specialty coffee lovers".
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

        </section>

        {/* SECTION 2.7: FEATURED SOLUTION – CASE STUDY */}
        <section className="px-16 py-20" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto">
            {/* Título centrado con animación */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-gray-900 text-center mb-8"
            >
              Solution
            </motion.h2>

            {/* Step indicator */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StepIndicator
                number="05"
                line1="Creativity takes place"
                line2="."
                highlightedWord="for the design"
                className="mb-16"
              />
            </motion.div>

            {/* Grid: Dispositivos izquierda, Feature Cards derecha */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-start">

              {/* Columna izquierda: Dispositivos */}
              <div className="relative">
                {/* Glow de fondo animado */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.6, scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="absolute -inset-12 bg-linear-to-tr from-blue-500/10 via-purple-500/10 to-emerald-400/10 blur-3xl pointer-events-none"
                />

                {/* Laptop mockup con animación de entrada dramática */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 200,
                    scale: 0.5,
                    rotateX: 45,
                    rotateZ: -8
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    rotateZ: 0
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: -2,
                    rotateX: 2,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                  }}
                  viewport={{ amount: 0.3, once: true }}
                  style={{
                    perspective: 2000,
                    transformStyle: 'preserve-3d'
                  }}
                  className="relative z-10 -ml-12 cursor-pointer"
                >
                  <motion.img
                    src="/solution/laptop.png"
                    alt="Coffee website on MacBook"
                    className="w-full h-auto drop-shadow-2xl"
                    whileHover={{
                      filter: 'brightness(1.05) saturate(1.05)',
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  />

                  {/* Brillo animado en hover más visible */}
                  <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{
                      opacity: [0, 0.6, 0],
                      x: '100%',
                      transition: { duration: 0.7, ease: 'easeInOut' }
                    }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                  />

                  {/* Sombra dinámica */}
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    whileHover={{
                      opacity: 0.5,
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    className="absolute -bottom-4 left-0 right-0 h-8 bg-black/20 blur-2xl rounded-full"
                  />
                </motion.div>

                {/* iPhone mockup volando desde fuera con flotación */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -100,
                    x: 400,
                    rotate: 90,
                    scale: 0.3
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 70,
                    x: 80,
                    rotate: -3,
                    scale: 1
                  }}
                  whileHover={{
                    y: 65,
                    scale: 1.02,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  animate={{
                    y: [70, 50, 70],
                    rotate: [-3, -6, -3],
                    x: [80, 75, 80],
                    transition: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  transition={{
                    duration: 1.8,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: 0.6
                  }}
                  viewport={{ amount: 0.3, once: true }}
                  className="hidden lg:block absolute bottom-0 right-4 z-20 w-60 cursor-pointer"
                  style={{
                    perspective: 2000,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <motion.img
                    src="/solution/iphone.png"
                    alt="Coffee website on iPhone"
                    className="w-full h-auto drop-shadow-[0_25px_60px_rgba(15,23,42,0.3)]"
                    whileHover={{
                      filter: 'brightness(1.03)',
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  />

                  {/* Sombra sutil */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.4, 0.3],
                      scale: [0.9, 1, 0.9],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-black/25 blur-2xl rounded-full"
                  />
                </motion.div>
              </div>

              {/* Columna derecha: Feature Cards con shadcn y animaciones */}
              <div className="space-y-4 lg:pt-12">
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.95, rotateY: 10 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: -2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ perspective: 1000 }}
                  className="relative group cursor-pointer"
                >
                  <Card className="transition-all duration-300 hover:shadow-2xl overflow-hidden relative">
                    {/* Borde animado en hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
                      style={{ padding: '2px' }}
                    />

                    {/* Brillo que se mueve */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />

                    <CardHeader>
                      <div className="flex items-start gap-3 relative z-10">
                        <motion.svg
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5, type: "spring" }
                          }}
                          transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
                          viewport={{ once: true }}
                          className="w-8 h-8 flex-shrink-0"
                          fill="none"
                          stroke="var(--foreground)"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            viewport={{ once: true }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </motion.svg>
                        <motion.div
                          className="flex-1"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CardTitle className="text-base mb-1">Highlight the product</CardTitle>
                          <CardDescription className="text-xs">
                            Emphasizing usefulness allows addressing a neutral clientele.
                          </CardDescription>
                        </motion.div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.95, rotateY: 10 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: -2,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ perspective: 1000 }}
                  className="relative group cursor-pointer"
                >
                  <Card className="transition-all duration-300 hover:shadow-2xl overflow-hidden relative">
                    {/* Borde animado en hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                      style={{ padding: '2px' }}
                    />

                    {/* Brillo que se mueve */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />

                    <CardHeader>
                      <div className="flex items-start gap-3 relative z-10">
                        <motion.svg
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.5, type: "spring" }
                          }}
                          transition={{ duration: 0.6, delay: 0.7, type: "spring", stiffness: 200 }}
                          viewport={{ once: true }}
                          className="w-8 h-8 flex-shrink-0"
                          fill="none"
                          stroke="var(--foreground)"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            viewport={{ once: true }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </motion.svg>
                        <motion.div
                          className="flex-1"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CardTitle className="text-base mb-1">Light and warm design</CardTitle>
                          <CardDescription className="text-xs">
                            Thanks to the colors, borders, and illustrations.
                          </CardDescription>
                        </motion.div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: PROJECTS GALLERY */}
        <section id="projects" className="min-h-screen px-16 py-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My Best Projects <span className="text-orange-500">✨</span>
          </h2>

          <div className="projects-grid max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

            {/* Project 1 */}
            <div className="project-card group cursor-pointer">
              <div className="bg-linear-to-br from-blue-50 via-cyan-50 to-white rounded-2xl p-6 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white rounded-xl aspect-video mb-6 flex items-center justify-center shadow-sm">
                  <span className="text-5xl">💼</span>
                </div>
                <h4 className="text-xl font-bold mb-3">.E-Commerce Platform</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">React</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">Node.js</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card group cursor-pointer">
              <div className="bg-linear-to-br from-orange-50 via-amber-50 to-white rounded-2xl p-6 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white rounded-xl aspect-video mb-6 flex items-center justify-center shadow-sm">
                  <span className="text-5xl">☕</span>
                </div>
                <h4 className="text-xl font-bold mb-3">.Coffee Shop</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">Next.js</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">Tailwind</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card group cursor-pointer">
              <div className="bg-linear-to-br from-green-50 via-emerald-50 to-white rounded-2xl p-6 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white rounded-xl aspect-video mb-6 flex items-center justify-center shadow-sm">
                  <span className="text-5xl">🍷</span>
                </div>
                <h4 className="text-xl font-bold mb-3">.Wine Investment</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">React</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">D3.js</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card group cursor-pointer">
              <div className="bg-linear-to-br from-purple-50 via-pink-50 to-white rounded-2xl p-6 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white rounded-xl aspect-video mb-6 flex items-center justify-center shadow-sm">
                  <span className="text-5xl">👗</span>
                </div>
                <h4 className="text-xl font-bold mb-3">.Thrift Store</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">Vue.js</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">Firebase</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="project-card group cursor-pointer">
              <div className="bg-linear-to-br from-cyan-50 via-teal-50 to-white rounded-2xl p-6 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white rounded-xl aspect-video mb-6 flex items-center justify-center shadow-sm">
                  <span className="text-5xl">🏠</span>
                </div>
                <h4 className="text-xl font-bold mb-3">.Real Estate</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">Next.js</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">Maps API</span>
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="project-card group cursor-pointer">
              <div className="bg-linear-to-br from-rose-50 via-red-50 to-white rounded-2xl p-6 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white rounded-xl aspect-video mb-6 flex items-center justify-center shadow-sm">
                  <span className="text-5xl">⚖️</span>
                </div>
                <h4 className="text-xl font-bold mb-3">.Law Firm</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">React</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">CMS</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: ABOUT ME */}
        <section id="about" className="min-h-screen px-16 py-32" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Roberto Vasquez</h1>
              <h3 className="text-2xl text-gray-600 mb-8">Full Stack Developer</h3>
              <p className="text-lg text-gray-500 mb-4">📍 Buenos Aires, Argentina</p>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed max-w-3xl">
                <h5 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                  I build modern, scalable web applications with clean code and robust architecture.
                </h5>

                <div>
                  Passionate about web development and problem-solving, I focus on creating efficient, maintainable solutions. From frontend interfaces to backend systems, I ensure every aspect of the project meets high technical standards.
                </div>

                <h5 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                  Full-stack development with modern technologies.
                </h5>

                <div>
                  I work with React, Next.js, Node.js, and modern frameworks to deliver production-ready applications. My clients value my technical expertise and commitment to quality code.
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="max-w-3xl mx-auto mt-20">
              <h4 className="text-xl font-bold mb-8 text-center">.Tech Stack</h4>
              <div className="flex gap-3 flex-wrap justify-center">
                {/* React */}
                <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:scale-105">
                  <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
                    <g fill="#61DAFB">
                      <circle cx="64" cy="64" r="11.4"/>
                      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21.1c-1.2-2.1-2.4-4.2-3.6-6.2 3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 92.3c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"/>
                    </g>
                  </svg>
                  React
                </span>

                {/* Next.js */}
                <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:scale-105">
                  <svg className="w-5 h-5" viewBox="0 0 128 128">
                    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"/>
                  </svg>
                  Next.js
                </span>

                {/* Node.js */}
                <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:scale-105">
                  <svg className="w-5 h-5" viewBox="0 0 128 128">
                    <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"/>
                  </svg>
                  Node.js
                </span>

                {/* Tailwind CSS */}
                <span className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:scale-105">
                  <svg className="w-5 h-5" viewBox="0 0 128 128">
                    <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"/>
                  </svg>
                  Tailwind CSS
                </span>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 text-center text-gray-500 text-sm pt-12 border-t border-gray-200">
              <span>© 2025 - Designed and developed with passion</span>
            </footer>
          </div>
        </section>

      </main>
    </>
  )
}
