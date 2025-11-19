"use client"

import { motion, AnimatePresence } from 'framer-motion'

const LivePreview = ({ currentStep }) => {
    // currentStep comes from CodeWindow typing progress
    // 0: Start
    // 1: Navbar typed
    // 2: Hero typed
    // 3: Image typed
    // 4: Grid typed
    // 5: Newsletter typed

    const sectionVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, type: "spring", bounce: 0.3 }
        }
    }

    return (
        <div className="w-full h-full bg-[#FDFBF7] overflow-y-auto scrollbar-hide select-none flex flex-col font-sans">
            {/* Navbar */}
            <AnimatePresence>
                {currentStep >= 1 && (
                    <motion.nav
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                        className="flex flex-wrap items-center justify-between px-6 py-6 sticky top-0 bg-[#FDFBF7]/95 backdrop-blur-sm z-10 gap-4"
                    >
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-xl tracking-tight text-[#2C1810]" style={{ fontFamily: 'var(--font-serif)' }}>Roastery.</span>
                        </div>

                        <div className="flex items-center gap-8 text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest">
                            <span className="hover:text-[#2C1810] cursor-pointer hidden sm:inline-block transition-colors">Shop</span>
                            <span className="hover:text-[#2C1810] cursor-pointer hidden sm:inline-block transition-colors">Subscription</span>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 text-[#2C1810]">
                            <span className="hover:opacity-70 cursor-pointer text-sm transition-opacity">🛒</span>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1">

                {/* Minimalist Hero Section */}
                <AnimatePresence>
                    {currentStep >= 2 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                            className="px-6 pb-12 pt-4"
                        >
                            <div className="flex flex-col items-center text-center mb-8">
                                <span className="text-[10px] font-bold text-[#C2651F] uppercase tracking-[0.3em] mb-4">Est. 2024</span>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#2C1810] mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-serif)' }}>
                                    Coffee,<br />
                                    <span className="italic text-[#8D6E63]">Elevated.</span>
                                </h1>
                                <p className="text-[#5D4037] text-xs max-w-xs mx-auto leading-relaxed mb-6">
                                    Small batch roasting. Ethically sourced beans. <br /> Delivered fresh to your door.
                                </p>
                                <button className="bg-[#2C1810] text-[#FDFBF7] px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#4E342E] transition-colors">
                                    Shop Now
                                </button>
                            </div>

                            {/* Hero Image - Separate Step */}
                            {currentStep >= 3 && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={sectionVariants}
                                    className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center hover:scale-105 transition-transform duration-1000"></div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bestsellers Section */}
                <AnimatePresence>
                    {currentStep >= 4 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                            className="px-6 pb-16"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-[#E6DCC8] pb-4">
                                <h2 className="text-lg font-bold text-[#2C1810]" style={{ fontFamily: 'var(--font-serif)' }}>Selected Roasts</h2>
                                <span className="text-[10px] font-bold text-[#C2651F] uppercase tracking-wider cursor-pointer hover:opacity-70">View All</span>
                            </div>

                            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-4 gap-y-8">
                                {[
                                    { name: "Yirgacheffe", origin: "Ethiopia", price: "$24", color: "bg-[#F5F5F5]" },
                                    { name: "Supremo", origin: "Colombia", price: "$22", color: "bg-[#F5F5F5]" },
                                    { name: "Antigua", origin: "Guatemala", price: "$21", color: "bg-[#F5F5F5]" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="group cursor-pointer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <div className={`aspect-[3/4] ${item.color} rounded-lg mb-4 relative flex items-center justify-center overflow-hidden bg-[#F2F0EB]`}>
                                            <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-90 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt="coffee" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-[#2C1810] text-sm leading-tight mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</h3>
                                                <p className="text-[10px] text-[#8D6E63] uppercase tracking-wide">{item.origin}</p>
                                            </div>
                                            <span className="text-xs font-bold text-[#2C1810]">{item.price}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Newsletter */}
                <AnimatePresence>
                    {currentStep >= 5 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                            className="px-6 pb-12"
                        >
                            <div className="border-t border-b border-[#E6DCC8] py-12 text-center">
                                <h3 className="font-bold text-xl text-[#2C1810] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Join the Club</h3>
                                <p className="text-xs text-[#8D6E63] mb-6">Get 15% off your first order.</p>
                                <div className="flex gap-0 max-w-xs mx-auto border-b border-[#2C1810]">
                                    <input type="email" placeholder="Your email" className="w-full px-2 py-2 text-xs text-[#2C1810] bg-transparent focus:outline-none placeholder-[#8D6E63]" />
                                    <button className="text-[#2C1810] font-bold text-[10px] uppercase tracking-widest whitespace-nowrap hover:opacity-70">Submit</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <AnimatePresence>
                    {currentStep >= 5 && (
                        <motion.footer
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                            className="bg-[#FDFBF7] text-[#8D6E63] py-8 px-6 text-[10px] flex justify-between items-center"
                        >
                            <span>© 2024 Roastery.</span>
                            <div className="flex gap-4 font-bold text-[#2C1810] uppercase tracking-wider">
                                <span>Insta</span>
                                <span>Fb</span>
                            </div>
                        </motion.footer>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}

export default LivePreview;
