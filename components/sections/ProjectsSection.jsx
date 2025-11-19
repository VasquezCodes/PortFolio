"use client"

const ProjectsSection = () => {
    return (
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
    )
}

export default ProjectsSection;
