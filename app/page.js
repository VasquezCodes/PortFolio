"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LoadingScreen from '@/components/LoadingScreen'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import HeroSection from '@/components/sections/HeroSection'
import ProcessSection from '@/components/sections/ProcessSection'
import AnalysisSection from '@/components/sections/AnalysisSection'
import SolutionSection from '@/components/sections/SolutionSection'
import DevelopmentSection from '@/components/sections/DevelopmentSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import FAQSection from '@/components/sections/FAQSection'
import AboutSection from '@/components/sections/AboutSection'
import { useLanguage } from '@/context/LanguageContext'
import ContactDrawer from '@/components/ContactDrawer'
import MouseTrail from '@/components/ui/MouseTrail'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const { language, t } = useLanguage()

  // Reload animation when language changes
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true)
      window.scrollTo(0, 0)
    }
  }, [language])

  useEffect(() => {
    if (isLoading) return // Don't setup animations while loading

    // Kill existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach(t => t.kill())

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

    // Active Section Tracking
    // Projects Section
    ScrollTrigger.create({
      trigger: '#projects',
      start: 'top 70%',
      end: 'bottom 70%',
      onEnter: () => setActiveSection('projects'),
      onLeave: () => setActiveSection('about'),
      onEnterBack: () => setActiveSection('projects'),
      onLeaveBack: () => setActiveSection('home')
    })

    // About Section
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 70%',
      onEnter: () => setActiveSection('about'),
      onLeaveBack: () => setActiveSection('projects')
    })

    // Force refresh to ensure correct positions
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
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
      <MouseTrail isLoading={isLoading} />
      {/* LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* CONTACT DRAWER */}
      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* MAIN CONTENT - Responsive margins */}
      <main key={language} className="md:ml-80 ml-0 text-gray-900 relative z-0" style={{ backgroundColor: 'var(--background)' }}>

        <HeroSection isLoading={isLoading} />
        <ProcessSection onOpenContact={() => setIsContactOpen(true)} />
        <AnalysisSection />
        <SolutionSection />
        <DevelopmentSection />
        <FAQSection />
        <ProjectsSection />
        <AboutSection />

      </main>

      {/* NAVIGATION & FLOATING ELEMENTS - Rendered last to ensure they are on top */}
      {!isLoading && (
        <>
          <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />
          <MobileNav activeSection={activeSection} scrollToSection={scrollToSection} />

          {/* WORK WITH ME BUTTON - Fixed top right on desktop, bottom right on mobile */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="fixed bottom-8 right-4 md:top-8 md:right-8 md:bottom-auto z-[9999] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
          >
            <span>{t.nav.workWithMe}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </>
      )}
    </>
  )
}

