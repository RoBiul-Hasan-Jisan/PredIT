'use client'

import { useState } from 'react'
import FormStep1 from './form-steps/FormStep1'
import FormStep2 from './form-steps/FormStep2'
import FormStep3 from './form-steps/FormStep3'
import FormStep4 from './form-steps/FormStep4'

interface FormData {
  gender: string
  school_type: string
  distance_from_home: string
  family_income: string
  hours_studied: number
  attendance: number
  sleep_hours: number
  tutoring_sessions: number
  extracurricular_activities: string
  internet_access: string
  previous_scores: number
  physical_activity: number
  learning_disabilities: string
  motivation_level: string
  peer_influence: string
  parental_involvement: string
  parental_education_level: string
  teacher_quality: string
  access_to_resources: string
}

interface FormCardProps {
  onPredictionComplete: (score: number) => void
}

const TOTAL_STEPS = 4

const requiredPills: Record<number, (keyof FormData)[]> = {
  1: ['gender', 'school_type', 'distance_from_home', 'family_income'],
  2: ['extracurricular_activities', 'internet_access'],
  3: ['learning_disabilities', 'motivation_level', 'peer_influence'],
  4: ['parental_involvement', 'parental_education_level', 'teacher_quality', 'access_to_resources'],
}

export default function FormCard({ onPredictionComplete }: FormCardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState<Partial<FormData>>({
    hours_studied: 5,
    attendance: 75,
    sleep_hours: 7,
    tutoring_sessions: 2,
    previous_scores: 70,
    physical_activity: 3,
  })

  const validateStep = (step: number) => {
    const required = requiredPills[step] || []
    const newErrors = new Set<string>()

    required.forEach((field) => {
      if (!formData[field]) {
        newErrors.add(field)
      }
    })

    setErrors(newErrors)
    return newErrors.size === 0
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) return
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        onPredictionComplete(data.score)
      } else {
        alert(`Prediction failed: ${data.error}`)
      }
    } catch (error) {
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 mx-auto max-w-2xl px-8 pb-32 pt-10 max-sm:px-5">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border px-10 py-7 max-sm:px-6 max-sm:py-5">
          <span className="text-sm font-medium text-muted">
            Step <strong className="text-primary font-semibold">{currentStep}</strong> of {TOTAL_STEPS}
          </span>
          <div className="flex gap-2.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
              const step = i + 1
              let dotClass = 'h-2 w-2 rounded-full bg-border transition-all duration-300'
              if (step === currentStep) {
                dotClass = 'h-2 w-6 rounded-full bg-primary transition-all duration-300'
              } else if (step < currentStep) {
                dotClass = 'h-2 w-2 rounded-full bg-secondary transition-all duration-300'
              }
              return <div key={step} className={dotClass} id={`dot-${step}`} />
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-border/40">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {/* Form sections */}
        <div className="min-h-96">
          {currentStep === 1 && (
            <FormStep1
              data={formData}
              setData={setFormData}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <FormStep2
              data={formData}
              setData={setFormData}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <FormStep3
              data={formData}
              setData={setFormData}
              errors={errors}
            />
          )}
          {currentStep === 4 && (
            <FormStep4
              data={formData}
              setData={setFormData}
              errors={errors}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-border px-10 py-6 max-sm:px-6">
          {currentStep === 1 ? (
            <div />
          ) : (
            <button
              onClick={handleBack}
              className="rounded-full border border-border bg-transparent px-6 py-2.5 text-sm font-medium text-muted transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              ← Back
            </button>
          )}

          {currentStep === TOTAL_STEPS ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 disabled:opacity-50 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:translate-y-0"
            >
              {isLoading ? (
                <>
                  <span style={{ display: isLoading ? 'none' : 'inline' }} className="font-medium">
                    Predicting...
                  </span>
                  <span
                    className="inline-block h-4.5 w-4.5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    style={{ display: isLoading ? 'inline-block' : 'none' }}
                  />
                </>
              ) : (
                <>
                  <span>Predict My Score</span>
                  <span>→</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="rounded-full border border-primary bg-transparent px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
