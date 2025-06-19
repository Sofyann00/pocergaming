import { NextResponse, NextRequest } from 'next/server'

// Explicitly mark this route as dynamic since it uses search parameters
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Use NextRequest's built-in searchParams instead of parsing request.url
    const brand = request.nextUrl.searchParams.get('brand')

    // Map product names to Digiflazz brand names
    const brandMap: { [key: string]: string } = {
      'mobile legends': 'MOBILE LEGENDS',
      'free fire': 'FREE FIRE',
      'pubg mobile': 'PUBG MOBILE',
      'ragnarok m classic': 'Ragnarok M Classic'
    }

    const digiflazzBrand = brand ? brandMap[brand.toLowerCase()] : 'MOBILE LEGENDS'

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
        brand: digiflazzBrand
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