'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import FormCard from './FormCard'
import ResultModal from './ResultModal'

export default function PredIT() {
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handlePredictionComplete = (predictionScore: number) => {
    setScore(predictionScore)
    setShowResult(true)
  }

  const handleRetry = () => {
    setShowResult(false)
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <FormCard onPredictionComplete={handlePredictionComplete} />
      <ResultModal
        isOpen={showResult}
        score={score}
        onClose={handleRetry}
      />
    </main>
  )
}
