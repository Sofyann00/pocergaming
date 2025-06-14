"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useQRCode } from 'next-qrcode'
import { PaymentSuccessDialog } from "@/app/components/payment-success-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useUser } from "@/contexts/user-context"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Voucher {
  id: string
  name: string
  game: string
  image: string
  price: number
  description: string
  seller: {
    id: string
    name: string
    rating: number
    avatar: string
    slug: string
  }
}

interface PaymentDetails {
  type: 'qris' | 'va'
  qrCode?: string
  bank?: string
  accountNumber?: string
  amount: number
  expiredAt: string
}

export default function ExclusiveVoucherPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const { user } = useUser()
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [sellerNotes, setSellerNotes] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'qris' | 'va'>('qris')
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [voucher, setVoucher] = useState<Voucher | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const { Canvas } = useQRCode()

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await fetch('/api/digiflazz/price-list')
        if (!response.ok) {
          throw new Error('Failed to fetch voucher')
        }
        const data = await response.json()
        const foundVoucher = data.find((v: Voucher) => v.id === params.id)
        if (!foundVoucher) {
          throw new Error('Voucher not found')
        }
        setVoucher(foundVoucher)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchVoucher()
  }, [params.id])

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to continue with your purchase.",
        variant: "destructive"
      })
      return
    }
    if (!userId) {
      toast({
        title: "Missing Information",
        description: "Please provide your game user ID.",
        variant: "destructive"
      })
      return
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please select a payment method.",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voucherId: params.id,
          userId,
          paymentMethod: selectedPaymentMethod,
          sellerNotes,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process payment')
      }

      const data = await response.json()
      setPaymentDetails(data.data.payment)
      setShowPaymentDialog(true)
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to process payment",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConfirmPayment = () => {
    setShowPaymentDialog(false)
    setShowSuccessDialog(true)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading voucher details...</p>
        </div>
      </div>
    )
  }

  if (error || !voucher) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          <p>Error: {error || 'Voucher not found'}</p>
          <Button
            onClick={() => router.push('/voucher')}
            className="mt-4"
          >
            Back to Vouchers
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Voucher Details */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={voucher.image}
              alt={voucher.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {voucher.game}
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{voucher.name}</h1>
            <p className="mt-2 text-gray-600">{voucher.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <Image
                src={voucher.seller.avatar}
                alt={voucher.seller.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{voucher.seller.name}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(voucher.seller.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">
                    ({voucher.seller.rating})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchase Voucher</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Game User ID
              </label>
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your game user ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Notes (Optional)
              </label>
              <Textarea
                value={sellerNotes}
                onChange={(e) => setSellerNotes(e.target.value)}
                placeholder="Add any notes for the seller"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <Select
                value={selectedPaymentMethod}
                onValueChange={(value: 'qris' | 'va') => setSelectedPaymentMethod(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qris">QRIS</SelectItem>
                  <SelectItem value="va">Virtual Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  {voucher.price.toLocaleString('id-ID')} IDR
                </span>
              </div>
              <Button
                onClick={handlePurchase}
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Purchase Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Please complete your payment before the expiration time.
            </DialogDescription>
          </DialogHeader>
          {paymentDetails && (
            <div className="mt-4">
              {paymentDetails.type === 'qris' ? (
                <div className="text-center">
                  <Image
                    src={paymentDetails.qrCode!}
                    alt="QRIS Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                  <p className="mt-4 text-sm text-gray-600">
                    Scan this QR code with your mobile banking app
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Bank</p>
                    <p className="font-medium">{paymentDetails.bank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Number</p>
                    <p className="font-medium">{paymentDetails.accountNumber}</p>
                  </div>
                </div>
              )}
              <div className="mt-4">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-xl font-bold text-blue-600">
                  {paymentDetails.amount.toLocaleString('id-ID')} IDR
                </p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Expires at</p>
                <p className="font-medium">
                  {new Date(paymentDetails.expiredAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmPayment}>
              I've Paid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful!</DialogTitle>
            <DialogDescription>
              Your voucher will be delivered shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mt-4 text-gray-600">
              Thank you for your purchase! We will process your order and deliver the voucher to your game account.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccessDialog(false)
                router.push('/voucher')
              }}
            >
              Back to Vouchers
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 