"use client"

import StepIndicator from '../ui/StepIndicator'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useLanguage } from '@/context/LanguageContext'

const AnalysisSection = () => {
    const { t } = useLanguage()

    return (
        <section className="min-h-[100dvh] px-4 md:px-16 py-32 relative" style={{ backgroundColor: 'var(--background)' }}>

            {/* Step indicator 03 - Analysis */}
            <StepIndicator
                number={t.analysis.step}
                line1={t.analysis.line1}
                line2="..."
                highlightedWord={t.analysis.highlightedWord}
                className="mb-32"
            />

            {/* Analysis cards */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                <Card className="case-card transition-all duration-500 hover:scale-105">
                    <CardHeader>
                        <div className="flex items-start gap-3">
                            <img src="/items/market.svg" alt="Market analysis" className="w-12 h-12" />
                            <div className="flex-1">
                                <CardTitle className="text-2xl mb-2">{t.analysis.marketAnalysis.title}</CardTitle>
                                <CardDescription>
                                    {t.analysis.marketAnalysis.description}
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
                                <CardTitle className="text-2xl mb-2">{t.analysis.problem.title}</CardTitle>
                                <CardDescription>
                                    {t.analysis.problem.description}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>

        </section>
    )
}

export default AnalysisSection;
