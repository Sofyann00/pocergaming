import { NextResponse } from 'next/server'
import crypto from 'crypto'

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // In production, replace with specific domains
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Digiflazz-Event, X-Hub-Signature',
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

/**
 * Digiflazz Webhook Handler
 * 
 * This endpoint receives transaction status updates from Digiflazz.
 * It verifies the webhook signature and processes the transaction status.
 * 
 * @param {Object} body - Webhook payload
 * @param {Object} body.data - Transaction data
 * @param {string} body.data.ref_id - Transaction reference ID
 * @param {string} body.data.customer_no - Customer number
 * @param {string} body.data.buyer_sku_code - Product code
 * @param {string} body.data.message - Status message
 * @param {string} body.data.status - Transaction status
 * @param {string} body.data.rc - Response code
 * @param {number} body.data.buyer_last_saldo - Last balance
 * @param {string} body.data.sn - Serial number
 * @param {number} body.data.price - Transaction price
 * @param {string} body.data.tele - Telegram username
 * @param {string} body.data.wa - WhatsApp number
 * 
 * @returns {Object} Response object
 */
export async function POST(request: Request) {
  try {
    // Get the webhook secret from environment variable
    const webhookSecret = 'shasta123'
    
    // Get the raw body for signature verification
    const rawBody = await request.text()
    
    // Get the signature from headers
    const signature = request.headers.get('X-Hub-Signature')
    const event = request.headers.get('X-Digiflazz-Event')
    
    // Verify signature
    const expectedSignature = 'sha1=' + crypto
      .createHmac('sha1', webhookSecret)
      .update(rawBody)
      .digest('hex')
    
    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401, headers: corsHeaders }
      )
    }

    // Parse the body
    const body = JSON.parse(rawBody)
    const { data } = body

    // Log the webhook event
    console.log('Digiflazz Webhook Event:', {
      event,
      data: {
        ref_id: data.ref_id,
        customer_no: data.customer_no,
        buyer_sku_code: data.buyer_sku_code,
        status: data.status,
        message: data.message,
        rc: data.rc,
        sn: data.sn,
        price: data.price
      }
    })

    // Handle different event types
    switch (event) {
      case 'create':
        // Handle new transaction
        await handleNewTransaction(data)
        break
      case 'update':
        // Handle transaction update
        await handleTransactionUpdate(data)
        break
      default:
        console.warn('Unknown event type:', event)
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.error('Digiflazz webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}

/**
 * Handle new transaction event
 */
async function handleNewTransaction(data: any) {
  // TODO: Implement your logic for new transactions
  // For example:
  // - Store transaction in database
  // - Send notification to user
  // - Update inventory
  console.log('New transaction:', data.ref_id)
}

/**
 * Handle transaction update event
 */
async function handleTransactionUpdate(data: any) {
  // TODO: Implement your logic for transaction updates
  // For example:
  // - Update transaction status in database
  // - Send notification to user about status change
  // - Update inventory if needed
  console.log('Transaction update:', data.ref_id, data.status)
} 