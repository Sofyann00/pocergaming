import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productCode, playerId, serverId } = body

    if (!productCode || !playerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const username = 'vipigaWmRVGg'
    const apiKey = 'c5f04bdb-dfdb-573e-8e21-00babcd8c6f1'

    const refId = `tu${productCode}`
    const sign = crypto.createHash('md5').update(username + apiKey + refId).digest('hex')

    const requestBody = {
      username,
      buyer_sku_code: productCode,
      customer_no: serverId ? `${playerId}${serverId}` : playerId,
      ref_id: refId,
      testing: false,
      sign
    }
    
    console.log('Digiflazz API Request Body:', requestBody)

    const response = await fetch('https://api.digiflazz.com/v1/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()
    console.log('Digiflazz API Response:', data)

    if (!response.ok) {
      console.error('Digiflazz API Error:', {
        status: response.status,
        statusText: response.statusText,
        data
      })
      return NextResponse.json(
        { error: data.message || data.data?.message || 'Failed to process transaction' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Digiflazz transaction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 