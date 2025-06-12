import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.digiflazz.com/v1/price-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cmd: 'prepaid',
        username: 'vipigaWmRVGg',
        sign: '4057af2c3806ada663835a2a3a8d861d',
        category: 'Games',
        brand: 'MOBILE LEGENDS'
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch price list')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching price list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price list' },
      { status: 500 }
    )
  }
} 