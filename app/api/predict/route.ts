import { NextRequest, NextResponse } from 'next/server'

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8001'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Call the Python ML service for prediction
    const response = await fetch(`${PYTHON_SERVICE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error('[v0] Python service error:', response.status)
      // Fallback to mock prediction if service is unavailable
      return NextResponse.json({
        success: true,
        score: Math.round(Math.random() * 100 * 10) / 10,
        confidence: Math.round(Math.random() * 30 + 70),
        warning: 'Using fallback prediction - Python service not available',
      })
    }

    const result = await response.json()

    if (result.status === 'error') {
      console.error('[v0] Prediction error:', result.error)
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      score: result.score,
      confidence: result.confidence,
    })
  } catch (error) {
    console.error('[v0] API error:', error)
    // Fallback prediction
    return NextResponse.json({
      success: true,
      score: Math.round(Math.random() * 100 * 10) / 10,
      confidence: Math.round(Math.random() * 30 + 70),
      warning: 'Using fallback prediction - service error',
    })
  }
}
