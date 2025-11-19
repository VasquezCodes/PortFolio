"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LoadingScreen from '@/components/LoadingScreen'
import Sidebar from '@/components/Sidebar'
import HeroSection from '@/components/sections/HeroSection'
import ProcessSection from '@/components/sections/ProcessSection'
import AnalysisSection from '@/components/sections/AnalysisSection'
import SolutionSection from '@/components/sections/SolutionSection'
import DevelopmentSection from '@/components/sections/DevelopmentSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AboutSection from '@/components/sections/AboutSection'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

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
      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* MAIN CONTENT - with left margin for sidebar */}
      <main className="ml-80 text-gray-900" style={{ backgroundColor: 'var(--background)' }}>

        {/* WORK WITH ME BUTTON - Fixed top right */}
        <button className="fixed top-8 right-8 z-40 px-6 py-3 font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
          <span>Work with me</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        <HeroSection isLoading={isLoading} />
        <ProcessSection />
        <AnalysisSection />
        <SolutionSection />
        <DevelopmentSection />
        <ProjectsSection />
        <AboutSection />

      </main>
    </>
  )
}
