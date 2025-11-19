"use client"

import StepIndicator from '../ui/StepIndicator'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const AnalysisSection = () => {
    return (
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
    )
}

export default AnalysisSection;
