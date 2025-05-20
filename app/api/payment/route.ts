import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch('https://api.mayaramp.com/v1/deposit/fiat', {
      method: 'POST',
      headers: {
        'x-client-secret': 'c1ca5b7dbe7d05a6871f755345ce5290da64ad04f41678f43a70dc7a96084958',
        'X-Bypass-Secret': 'YZKNsyPLlvQJ5FwRNPrnLo0UsQZzEOgm',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTI3ODkxNTc4YmU5OTM4ZGU2YjJhZCIsImVtYWlsIjoiZmVsaXhsYW1iZXRAZ21haWwuY29tIiwibmFtZSI6IkRVTU1ZVVNFUkRFUExPWSIsInJvbGUiOiJhZG1pbiIsInBvbGljeSI6IjY3OTI3NWI5NTc4YmU5OTM4ZGU2YjEyYiIsInR5cGUiOiJidXNpbmVzcyIsIm9yZ2FuaXphdGlvbklkIjoiNjc5Mjc1Yjk1NzhiZTk5MzhkZTZiMTI5Iiwib3JnYW5pemF0aW9uTmFtZSI6IkRVTU1ZIE9SR1ogREVQTE9ZIiwiaWF0IjoxNzQ3NzIwMjM4LCJleHAiOjE3NDgzMjUwMzh9.i_qRqdm3uJ_cmK7ilQ94ihYS0zBCnlV147iuIWnjqu7tjgDUCQxVgZpBTjq10CQ1xKG9C4yWpL-yaAydVoMdbljL3QzAiOWpZ79Q_nQJr3Ag3E8XluGTit2XNud_TD-KkIaL4CR9A9Vh92XnUn-bpbE-UnoyESHIy7i3qgfqDTs7kHFiz20DllM330EZeceVAkMHmtMPcwxqtR0Lyn9oPuozduB3HuiUt-Yf1NTJ8vQcgORAUqLA2w0N2hSJtRuGm-1XotwlQeYaCLSJAL2lY1kUJN-MRFsnLZcgUJhqS9e6a_FyQ9kHO6aQkbgn8nrECOHXBMIHBBHqFlMoMwILAA'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to create payment' },
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