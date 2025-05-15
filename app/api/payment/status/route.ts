import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const depositId = searchParams.get('depositId')

    if (!depositId) {
      return NextResponse.json(
        { message: 'Deposit ID is required' },
        { status: 400 }
      )
    }

    const response = await fetch(`https://api.mayaramp.com/v1/deposit/${depositId}`, {
      headers: {
        'x-client-secret': 'c1ca5b7dbe7d05a6871f755345ce5290da64ad04f41678f43a70dc7a96084958',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTI3ODkxNTc4YmU5OTM4ZGU2YjJhZCIsImVtYWlsIjoiZmVsaXhsYW1iZXRAZ21haWwuY29tIiwibmFtZSI6IkRVTU1ZVVNFUkRFUExPWSIsInJvbGUiOiJhZG1pbiIsInBvbGljeSI6IjY3OTI3NWI5NTc4YmU5OTM4ZGU2YjEyYiIsInR5cGUiOiJidXNpbmVzcyIsIm9yZ2FuaXphdGlvbklkIjoiNjc5Mjc1Yjk1NzhiZTk5MzhkZTZiMTI5Iiwib3JnYW5pemF0aW9uTmFtZSI6IkRVTU1ZIE9SR1ogREVQTE9ZIiwiaWF0IjoxNzQ3MTA3NjM3LCJleHAiOjE3NDc3MTI0Mzd9.LBWhWzoyuArj9T1bPWt2w0fAPuHEgAEVDfahj5wVl9hRJ3B8ik0ciXY5o87WCX6tn0PJWa5fqf7zpTh1CUkTEQS4fyxQWbedNr0ff1ZRLRLCYlg9dHoz4wB0mAzanb_zvS6OpglTrmxd5Kv8WoavFX5FKdclUVRjACx2Mu-i6PzITngcWaD2mI4GW7KhdVf8YYdjjjbRcf4QCtKYgzKSxuc0nBsOFSUlIOJRhooLTyzs5_ffShpo2pr2CAA95yKJZsxAQr0arFLbwZerEbGvrVxZ4JMCwLREwa7wT3SMqzM3M2-xQTfAHFT0t9SnMKL7H9DJHgZA_CsnNEHKGYOAcA'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to check payment status' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 