import { motion } from 'framer-motion'
import StepIndicator from '../ui/StepIndicator'
import { FileText, SlidersHorizontal, Moon } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const FAQSection = () => {
    const { t } = useLanguage()

    const faqItems = [
        {
            question: t.faq.items[0].question,
            answer: t.faq.items[0].answer,
            icon: FileText
        },
        {
            question: t.faq.items[1].question,
            answer: t.faq.items[1].answer,
            icon: SlidersHorizontal
        },
        {
            question: t.faq.items[2].question,
            answer: t.faq.items[2].answer,
            icon: Moon
        }
    ]

    return (
        <section id="faq" className="px-4 md:px-16 py-24 md:py-32" style={{ backgroundColor: 'var(--background)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                    <StepIndicator
                        number="09"
                        line1={t.faq.title}
                        line2="..."
                        highlightedWord=""
                    />
                </div>

                <div className="space-y-20">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                            className="grid grid-cols-1 md:grid-cols-[280px_100px_1fr] gap-8 items-start group"
                        >
                            {/* Question Column */}
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#000080]/5 flex items-center justify-center text-[#000080] group-hover:bg-[#000080] group-hover:text-white transition-colors duration-300">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold leading-tight max-w-[200px] group-hover:text-[#000080] transition-colors duration-300">
                                    {item.question}
                                </h3>
                            </div>

                            {/* Line Separator */}
                            <div className="hidden md:flex items-center h-full pt-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 + (index * 0.2) }}
                                    className="h-[2px] bg-gray-200 group-hover:bg-[#000080]/30 transition-colors duration-300"
                                ></motion.div>
                            </div>

                            {/* Answer Column */}
                            <div className="pt-1">
                                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl group-hover:text-gray-900 transition-colors duration-300">
                                    {item.answer}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQSection
