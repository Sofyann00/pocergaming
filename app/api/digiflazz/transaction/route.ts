import { NextResponse } from 'next/server'
import crypto from 'crypto'

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // In production, replace with specific domains
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

/**
 * Digiflazz Transaction API
 * 
 * This endpoint processes transactions through the Digiflazz API.
 * 
 * @param {Object} body - Request body
 * @param {string} body.productCode - The product code to purchase
 * @param {string} body.playerId - The player's ID
 * @param {string} [body.serverId] - Optional server ID
 * 
 * @returns {Object} Response object containing transaction details
 * @throws {Object} Error response if request fails
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productCode, playerId, serverId } = body

    if (!productCode || !playerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      )
    }

    const username = 'vipigaWmRVGg'
    const apiKey = 'c5f04bdb-dfdb-573e-8e21-00babcd8c6f1'

    // Generate random 6-character string
    const generateRandomString = (length: number) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }

    const refId = `${generateRandomString(6)}${productCode}`
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
        { status: response.status, headers: corsHeaders }
      )
    }

    return NextResponse.json(data, { headers: corsHeaders })
  } catch (error) {
    console.error('Digiflazz transaction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
} 