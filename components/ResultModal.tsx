'use client'

import { useEffect, useState } from 'react'

interface ResultModalProps {
  isOpen: boolean
  score: number
  onClose: () => void
}

export default function ResultModal({ isOpen, score, onClose }: ResultModalProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [fillWidth, setFillWidth] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setDisplayScore(0)
      setFillWidth(0)
      return
    }

    // Animate score counter
    let current = 0
    const target = Math.round(score)
    const step = Math.max(1, Math.floor(target / 40))

    const counter = setInterval(() => {
      current = Math.min(current + step, target)
      setDisplayScore(current)
      if (current >= target) clearInterval(counter)
    }, 25)

    // Animate progress fill after a slight delay
    setTimeout(() => {
      setFillWidth(score)
    }, 100)

    return () => clearInterval(counter)
  }, [isOpen, score])

  const getGradeInfo = (
    scoreVal: number
  ): { grade: string; message: string } => {
    if (scoreVal >= 90) {
      return {
        grade: 'Outstanding — A+',
        message:
          "Exceptional result! Your strong study habits, high attendance, and supportive environment are paying off. <strong>Keep up this excellent momentum.</strong>",
      }
    } else if (scoreVal >= 80) {
      return {
        grade: 'Excellent — A',
        message:
          "Great performance! You're performing above average. <strong>A little more focus on weak areas</strong> could push you into outstanding territory.",
      }
    } else if (scoreVal >= 70) {
      return {
        grade: 'Good — B',
        message:
          "Solid result. You're on the right track. <strong>Consider increasing study hours or tutoring sessions</strong> to climb higher.",
      }
    } else if (scoreVal >= 60) {
      return {
        grade: 'Average — C',
        message:
          "There's clear room to grow. Try improving <strong>sleep consistency, attendance, and peer interactions</strong> to boost your score significantly.",
      }
    } else {
      return {
        grade: 'Needs Improvement — D',
        message:
          "Don't be discouraged — small changes make a big difference. Focus on <strong>regular study, better attendance, and seeking teacher support.</strong>",
      }
    }
  }

  const gradeInfo = getGradeInfo(score)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-plum/55 backdrop-blur-lg transition-opacity duration-300 max-sm:px-5 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className={`relative max-w-lg w-full rounded-3xl border border-border bg-cream p-11 shadow-2xl transition-all duration-350 max-sm:p-8 ${
            isOpen ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4.5 top-4.5 flex h-9 w-9 items-center justify-center rounded-full bg-cream-dk text-muted transition-all hover:border-plum hover:bg-plum hover:text-cream border border-border"
          >
            ✕
          </button>

          {/* Logo */}
          <div className="mb-7 flex justify-center">
            <div className="relative inline-flex">
              <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-lg bg-plum" />
              <div className="relative inline-flex items-center gap-1 rounded-lg border-2 border-plum bg-cream px-3 py-1.5">
                <span className="font-playfair text-lg italic font-bold text-mauve">
                  %
                </span>
                <span className="font-playfair text-lg font-bold text-plum">
                  PredIT
                </span>
              </div>
            </div>
          </div>

          {/* Result label */}
          <p className="mb-2.5 text-center text-xs font-semibold uppercase tracking-wide text-muted">
            Predicted Exam Score
          </p>

          {/* Score display */}
          <div className="mb-3.5 flex items-baseline justify-center gap-1.5">
            <span className="font-playfair text-8xl font-bold leading-none text-plum">
              {displayScore}
            </span>
            <span className="font-playfair text-3xl text-muted">/ 100</span>
          </div>

          {/* Progress bar */}
          <div className="mb-3.5 h-1.5 w-full rounded-full bg-cream-dk overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mauve to-sage-dk transition-all duration-1200"
              style={{ width: `${fillWidth}%` }}
            />
          </div>

          {/* Grade */}
          <p className="mb-5.5 text-center font-playfair text-base font-semibold text-mauve">
            {gradeInfo.grade}
          </p>

          {/* Divider */}
          <div className="mb-5.5 h-px bg-border" />

          {/* Message */}
          <p
            className="mb-7 text-left text-sm font-light leading-relaxed text-muted"
            dangerouslySetInnerHTML={{
              __html: gradeInfo.message,
            }}
          />

          {/* Retry button */}
          <button
            onClick={onClose}
            className="w-full rounded-lg border-1.5 border-border bg-transparent px-4 py-3.5 text-sm font-medium text-plum transition-all hover:border-plum hover:bg-plum hover:text-cream"
          >
            ↺ Try Different Values
          </button>
        </div>
      </div>
    </>
  )
}
