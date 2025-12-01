
"use client"

import ProjectCard from "../ProjectCard"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from '@/context/LanguageContext'

const ProjectsSection = () => {
    const { t } = useLanguage()

    const projects = [
        {
            title: "JD global solutions",
            slides: [
                {
                    type: 'combined',
                    desktop: "/minicarusel/JdMock.png",
                    mobile: "/minicarusel/jdMobileMockUp (2).png"
                },
                {
                    type: 'collage',
                    images: [
                        "/minicarusel/jdcarrusel (1).jpeg",
                        "/minicarusel/jdcarrusel (2).jpeg",
                        "/minicarusel/jdcarrusel (3).jpeg",
                        "/minicarusel/jdcarrusel (4).jpeg"
                    ]
                }
            ],
            tags: [t.projects.tags.webDesign, t.projects.tags.presentation],
            link: "https://www.jdglobalsolutionss.com/",
            color: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)" // Yellow
        },
        {
            title: "Maje Nail Spa",
            slides: [
                {
                    type: 'combined',
                    desktop: "/minicarusel/MajeMock.png",
                    mobile: "/minicarusel/majeMobileMockUp.png"
                },
                {
                    type: 'collage',
                    images: [
                        "/minicarusel/majecarrusel (1).jpeg",
                        "/minicarusel/majecarrusel (2).jpeg",
                        "/minicarusel/majecarrusel (3).jpeg",
                        "/minicarusel/majecarrusel (4).jpeg"
                    ]
                }
            ],
            tags: [t.projects.tags.webDesign, t.projects.tags.presentation],
            link: "https://www.majenailspa.com/",
            color: "linear-gradient(135deg, #e0e0e0 0%, #9e9e9e 100%)" // Black/Grey
        },
        {
            title: "Samolina Factory",
            slides: [
                {
                    type: 'combined',
                    desktop: "/minicarusel/samolinaMoc.png",
                    mobile: "/minicarusel/samolinamobileMockUp.png"
                },
                {
                    type: 'collage',
                    layout: 'stack',
                    images: [
                        "/minicarusel/samolinacarrusel (1).jpeg",
                        "/minicarusel/samolinacarrusel (2).jpeg",
                        "/minicarusel/samolinacarrusel (3).jpeg"
                    ]
                }
            ],
            tags: [t.projects.tags.webDesign, t.projects.tags.presentation],
            link: "https://www.samolinafactory.com/",
            color: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)" // Pink/Pastel
        }
    ]

    return (
        <section id="projects" className="min-h-screen px-4 md:px-16 py-32">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-2">
                        {t.projects.title} <img src="/starss.svg" alt="Stars" className="w-8 h-8 md:w-10 md:h-10 inline-block" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            {...project}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProjectsSection;
