"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Component to simulate typing a single line
const TypingLine = ({ children, delay, onComplete }) => {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: "linear"
            }}
            onAnimationComplete={onComplete}
            className="overflow-hidden whitespace-nowrap border-r-2 border-transparent pr-1"
            style={{ maxWidth: "fit-content" }}
        >
            {children}
        </motion.div>
    )
}

const CodeWindow = ({ startAnimation, onStepComplete }) => {
    // We use a sequence state to trigger lines one by one or in groups
    // But simpler: Use staggered delays based on line index

    // To sync with LivePreview, we need to know when specific blocks finish.
    // Navbar finishes at line ~8
    // Hero finishes at line ~15
    // Grid finishes at line ~22
    // Newsletter finishes at line ~25

    // Let's define the delays manually for precision
    const baseDelay = 0.5;
    const lineDuration = 0.3; // Slower typing for better effect

    return (
        <div className="w-full h-full bg-[#1e1e1e] p-6 font-mono text-sm overflow-hidden relative">
            {/* Window Controls */}
            <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>

            {/* Code Content */}
            {startAnimation && (
                <div className="text-gray-300 leading-relaxed">
                    <TypingLine delay={baseDelay} onComplete={() => { }}>
                        <div><span className="text-[#569cd6]">export</span> <span className="text-[#569cd6]">default</span> <span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">RoasteryMinimal</span><span className="text-[#ffd700]">{`()`}</span> <span className="text-[#ffd700]">{`{`}</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 1} onComplete={() => { }}>
                        <div className="pl-4"><span className="text-[#569cd6]">return</span> <span className="text-[#ffd700]">{`(`}</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 2} onComplete={() => { }}>
                        <div className="pl-8"><span className="text-[#808080]">{`<`}</span><span className="text-[#569cd6]">div</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">"bg-[#FDFBF7] font-serif"</span><span className="text-[#808080]">{`>`}</span></div>
                    </TypingLine>

                    {/* Navbar Block */}
                    <TypingLine delay={baseDelay + lineDuration * 3} onComplete={() => { }}>
                        <div className="pl-12"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">Navbar</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 4} onComplete={() => { }}>
                        <div className="pl-16"><span className="text-[#9cdcfe]">logo</span>=<span className="text-[#ce9178]">"Roastery."</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 5} onComplete={() => onStepComplete(1)}>
                        <div className="pl-16"><span className="text-[#9cdcfe]">menu</span>=<span className="text-[#ffd700]">{`{['Shop', 'Subscription']}`}</span></div>
                        <div className="pl-12"><span className="text-[#808080]">{`/>`}</span></div>
                    </TypingLine>

                    {/* Hero Block */}
                    <TypingLine delay={baseDelay + lineDuration * 7} onComplete={() => { }}>
                        <div className="pl-12"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">Hero</span> <span className="text-[#9cdcfe]">align</span>=<span className="text-[#ce9178]">"center"</span><span className="text-[#808080]">{`>`}</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 8} onComplete={() => { }}>
                        <div className="pl-16"><span className="text-[#808080]">{`<`}</span><span className="text-[#569cd6]">h1</span><span className="text-[#808080]">{`>`}</span>Coffee, <span className="text-[#808080]">{`<`}</span><span className="text-[#569cd6]">span</span><span className="text-[#808080]">{`>`}</span>Elevated.<span className="text-[#808080]">{`</`}</span><span className="text-[#569cd6]">span</span><span className="text-[#808080]">{`><`}</span><span className="text-[#569cd6]">/h1</span><span className="text-[#808080]">{`>`}</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 9} onComplete={() => { }}>
                        <div className="pl-16"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">Button</span><span className="text-[#808080]">{`>`}</span>Shop Now<span className="text-[#808080]">{`</`}</span><span className="text-[#4ec9b0]">Button</span><span className="text-[#808080]">{`>`}</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 10} onComplete={() => onStepComplete(2)}>
                        <div className="pl-12"><span className="text-[#808080]">{`</`}</span><span className="text-[#4ec9b0]">Hero</span><span className="text-[#808080]">{`>`}</span></div>
                    </TypingLine>

                    {/* Image Block */}
                    <TypingLine delay={baseDelay + lineDuration * 12} onComplete={() => { }}>
                        <div className="pl-12"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">Image</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 13} onComplete={() => onStepComplete(3)}>
                        <div className="pl-16"><span className="text-[#9cdcfe]">src</span>=<span className="text-[#ce9178]">"/roast-process.jpg"</span></div>
                        <div className="pl-12"><span className="text-[#808080]">{`/>`}</span></div>
                    </TypingLine>

                    {/* Grid Block */}
                    <TypingLine delay={baseDelay + lineDuration * 15} onComplete={() => { }}>
                        <div className="pl-12"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">Grid</span> <span className="text-[#9cdcfe]">cols</span>=<span className="text-[#b5cea8]">3</span> <span className="text-[#9cdcfe]">gap</span>=<span className="text-[#b5cea8]">8</span><span className="text-[#808080]">{`>`}</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 16} onComplete={() => { }}>
                        <div className="pl-16"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">ProductCard</span> <span className="text-[#9cdcfe]">name</span>=<span className="text-[#ce9178]">"Yirgacheffe"</span> <span className="text-[#808080]">{`/>`}</span></div>
                    </TypingLine>
                    <TypingLine delay={baseDelay + lineDuration * 17} onComplete={() => onStepComplete(4)}>
                        <div className="pl-16"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">ProductCard</span> <span className="text-[#9cdcfe]">name</span>=<span className="text-[#ce9178]">"Supremo"</span> <span className="text-[#808080]">{`/>`}</span></div>
                        <div className="pl-12"><span className="text-[#808080]">{`</`}</span><span className="text-[#4ec9b0]">Grid</span><span className="text-[#808080]">{`>`}</span></div>
                    </TypingLine>

                    {/* Newsletter */}
                    <TypingLine delay={baseDelay + lineDuration * 19} onComplete={() => onStepComplete(5)}>
                        <div className="pl-12"><span className="text-[#808080]">{`<`}</span><span className="text-[#4ec9b0]">Newsletter</span> <span className="text-[#9cdcfe]">offer</span>=<span className="text-[#ce9178]">"15% OFF"</span> <span className="text-[#808080]">{`/>`}</span></div>
                    </TypingLine>

                    <TypingLine delay={baseDelay + lineDuration * 20} onComplete={() => { }}>
                        <div className="pl-8"><span className="text-[#808080]">{`</`}</span><span className="text-[#569cd6]">div</span><span className="text-[#808080]">{`>`}</span></div>
                        <div className="pl-4"><span className="text-[#ffd700]">{`)`}</span></div>
                        <div><span className="text-[#ffd700]">{`}`}</span></div>
                    </TypingLine>
                </div>
            )}
        </div>
    )
}

export default CodeWindow;
