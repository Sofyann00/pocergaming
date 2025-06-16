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
  const { user, addOrder } = useUser()
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [serverId, setServerId] = useState("")
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
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isCheckingPayment, setIsCheckingPayment] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    // Hardcoded vouchers with 5 specific sellers
    const hardcodedVouchers = [
      {
        id: "ml80",
        name: "MOBILELEGEND - 80 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 21028,
        description: "80 Diamonds for Mobile Legends",
        seller: {
          id: "1",
          name: "Genggam Dunia Game",
          rating: 4.9,
          avatar: "/seller_ic/gdg_ic.png",
          slug: "genggam-dunia-game"
        }
      },
      {
        id: "ml85",
        name: "MOBILELEGEND - 85 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 24780,
        description: "85 Diamonds for Mobile Legends",
        seller: {
          id: "2",
          name: "Kasih Game Store",
          rating: 4.8,
          avatar: "/seller_ic/kgs_ic.png",
          slug: "kasih-game-store"
        }
      },
      {
        id: "ml86",
        name: "MOBILELEGEND - 86 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 24010,
        description: "86 Diamonds for Mobile Legends",
        seller: {
          id: "3",
          name: "Legenda Topup",
          rating: 4.7,
          avatar: "/seller_ic/lgt_ic.png",
          slug: "legenda-topup"
        }
      },
      {
        id: "ml88",
        name: "MOBILELEGEND - 88 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 22814,
        description: "88 Diamonds for Mobile Legends",
        seller: {
          id: "4",
          name: "Sahabat Gaming",
          rating: 4.9,
          avatar: "/seller_ic/sg_ic.png",
          slug: "sahabat-gaming"
        }
      },
      {
        id: "ml89",
        name: "MOBILELEGEND - 89 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 23271,
        description: "89 Diamonds for Mobile Legends",
        seller: {
          id: "5",
          name: "TopUp1212",
          rating: 4.8,
          avatar: "/seller_ic/t12_ic.png",
          slug: "topup1212"
        }
      },
      {
        id: "ml90",
        name: "MOBILELEGEND - 90 Diamond",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 23241,
        description: "90 Diamonds for Mobile Legends",
        seller: {
          id: "1",
          name: "Genggam Dunia Game",
          rating: 4.9,
          avatar: "/seller_ic/gdg_ic.png",
          slug: "genggam-dunia-game"
        }
      },
      {
        id: "mlweek",
        name: "MOBILE LEGENDS Weekly Diamond Pass",
        game: "Mobile Legends",
        image: "https://static-src.vocagame.com/vocagame/mobilelegends-4702-original.webp",
        price: 21000,
        description: "Weekly Diamond Pass for Mobile Legends",
        seller: {
          id: "2",
          name: "Kasih Game Store",
          rating: 4.8,
          avatar: "/seller_ic/kgs_ic.png",
          slug: "kasih-game-store"
        }
      },
      {
        id: "pbgrp",
        name: "Pubg Royale Pass",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 142200,
        description: "Royal Pass + Bonus for PUBG Mobile",
        seller: {
          id: "3",
          name: "Legenda Topup",
          rating: 4.7,
          avatar: "/seller_ic/lgt_ic.png",
          slug: "legenda-topup"
        }
      },
      {
        id: "pm105",
        name: "PUBG MOBILE 105 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 27125,
        description: "105 UC for PUBG Mobile",
        seller: {
          id: "4",
          name: "Sahabat Gaming",
          rating: 4.9,
          avatar: "/seller_ic/sg_ic.png",
          slug: "sahabat-gaming"
        }
      },
      {
        id: "pm120",
        name: "PUBG MOBILE 120 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 26874,
        description: "120 UC for PUBG Mobile",
        seller: {
          id: "5",
          name: "TopUp1212",
          rating: 4.8,
          avatar: "/seller_ic/t12_ic.png",
          slug: "topup1212"
        }
      },
      {
        id: "pm122",
        name: "PUBG MOBILE 122 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 40682,
        description: "122 UC for PUBG Mobile",
        seller: {
          id: "1",
          name: "Genggam Dunia Game",
          rating: 4.9,
          avatar: "/seller_ic/gdg_ic.png",
          slug: "genggam-dunia-game"
        }
      },
      {
        id: "pm125",
        name: "PUBG MOBILE 125 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 48500,
        description: "125 UC for PUBG Mobile",
        seller: {
          id: "2",
          name: "Kasih Game Store",
          rating: 4.8,
          avatar: "/seller_ic/kgs_ic.png",
          slug: "kasih-game-store"
        }
      },
      {
        id: "pm131",
        name: "PUBG MOBILE 131 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 40681,
        description: "131 UC for PUBG Mobile",
        seller: {
          id: "3",
          name: "Legenda Topup",
          rating: 4.7,
          avatar: "/seller_ic/lgt_ic.png",
          slug: "legenda-topup"
        }
      },
      {
        id: "pm62",
        name: "PUBG MOBILE 62 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 27125,
        description: "62 UC for PUBG Mobile",
        seller: {
          id: "4",
          name: "Sahabat Gaming",
          rating: 4.9,
          avatar: "/seller_ic/sg_ic.png",
          slug: "sahabat-gaming"
        }
      },
      {
        id: "pm70",
        name: "PUBG MOBILE 70 UC",
        game: "PUBG Mobile",
        image: "https://static-src.vocagame.com/vocagame/pubg_global-afab-original.webp",
        price: 21107,
        description: "70 UC for PUBG Mobile",
        seller: {
          id: "5",
          name: "TopUp1212",
          rating: 4.8,
          avatar: "/seller_ic/t12_ic.png",
          slug: "topup1212"
        }
      }
    ];

    const foundVoucher = hardcodedVouchers.find(v => v.id === params.id);
    if (!foundVoucher) {
      setError('Voucher not found');
    } else {
      setVoucher(foundVoucher);
    }
    setLoading(false);
  }, [params.id]);

  // Add polling mechanism
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const checkPaymentStatus = async () => {
      if (!paymentData?.depositId || isCheckingPayment) return;

      try {
        setIsCheckingPayment(true);
        const response = await fetch(`/api/payment/status?depositId=${paymentData.depositId}`);
        const data = await response.json();

        if (data.data?.status === 'completed') {
          // Payment completed successfully
          clearInterval(pollInterval);
          setShowPaymentDialog(false);
          setShowSuccessDialog(true);
          // Handle successful payment
          handlePaymentComplete();
        } else if (data.data?.status === 'failed' || data.data?.status === 'expired') {
          // Payment failed or expired
          clearInterval(pollInterval);
          toast({
            title: "Payment Failed",
            description: "Your payment has failed or expired. Please try again.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      } finally {
        setIsCheckingPayment(false);
      }
    };

    if (showPaymentDialog && paymentData?.depositId) {
      // Start polling when dialog is shown and we have a deposit ID
      pollInterval = setInterval(checkPaymentStatus, 10000); // Poll every 10 seconds
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [showPaymentDialog, paymentData?.depositId]);

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

    if (voucher?.game === "Mobile Legends" && !serverId) {
      toast({
        title: "Missing Information",
        description: "Please provide your server ID for Mobile Legends.",
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

    setIsLoadingPayment(true)
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          outputCurrency: "IDR",
          reference: `order-${Date.now()}`,
          inputCurrency: "IDR",
          balanceType: "fiat",
          paymentMethod: selectedPaymentMethod,
          inputAmount: voucher?.price || 0
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment');
      }

      setPaymentData(data.data);
      setShowPaymentDialog(true);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive"
      })
    } finally {
      setIsLoadingPayment(false)
    }
  }

  const handlePaymentComplete = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "Please log in to complete your purchase.",
        variant: "destructive"
      })
      return
    }

    if (!voucher) {
      toast({
        title: "Error",
        description: "Voucher information is missing.",
        variant: "destructive"
      })
      return
    }

    try {
      // Add order to user's orders
      addOrder({
        items: [{
          id: voucher.id.toString(),
          name: voucher.name,
          price: voucher.price,
          quantity: 1,
          image: voucher.image
        }],
        total: voucher.price,
        status: "completed",
        productName: voucher.game,
        itemName: voucher.name
      })

      // Call our backend API for Digiflazz transaction
      const digiflazzResponse = await fetch('/api/digiflazz/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode: voucher.id,
          playerId: userId,
          serverId: voucher.game === "Mobile Legends" ? serverId : undefined
        })
      })

      const digiflazzData = await digiflazzResponse.json()
      
      if (!digiflazzResponse.ok) {
        throw new Error(digiflazzData.error || 'Failed to process transaction')
      }

      // Send confirmation email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          productName: voucher.name,
          itemName: voucher.name,
          price: voucher.price,
          playerId: userId
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Email Error",
          description: "Failed to send confirmation email, but your purchase was successful.",
          variant: "destructive"
        })
      }
      
      setShowPaymentDialog(false)
      toast({
        title: "Thank You For Purchasing",
        description: `Your purchase of ${voucher.name} is being processed. We'll notify you via email once completed.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your purchase. Please try again.",
        variant: "destructive"
      })
    }
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
            {voucher?.game === "Mobile Legends" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Server ID
                </label>
                <Input
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                  placeholder="Enter your server ID (e.g., 1234)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  You can find your server ID in your profile
                </p>
              </div>
            )}
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
                disabled={isLoadingPayment}
              >
                {isLoadingPayment ? 'Processing...' : 'Purchase Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete your payment using the selected method
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                Total Amount: Rp {voucher?.price.toLocaleString('id-ID')},-
              </p>
              <p className="text-sm text-gray-500">
                {voucher?.name}
              </p>
            </div>

            {selectedPaymentMethod === 'qris' && paymentData?.paymentFiat?.qrData ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-64 h-64">
                  <Canvas
                    text={paymentData.paymentFiat.qrData}
                    options={{
                      errorCorrectionLevel: 'M',
                      margin: 3,
                      scale: 4,
                      width: 256,
                      color: {
                        dark: '#000000FF',
                        light: '#FFFFFFFF',
                      },
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Scan QR code using your preferred payment app
                </p>
                <div className="text-sm text-gray-500">
                  <p>Expires at: {new Date(paymentData.expiredAt).toLocaleString()}</p>
                </div>
              </div>
            ) : selectedPaymentMethod === 'va' && paymentData?.paymentFiat ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Virtual Account Number:</p>
                  <p className="text-lg font-mono font-semibold text-gray-900">{paymentData.paymentFiat.accountNumber}</p>
                  <p className="text-sm text-gray-500 mt-1">Bank: {paymentData.paymentFiat.bankName}</p>
                </div>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>1. Login to your mobile banking app</li>
                  <li>2. Select Virtual Account payment</li>
                  <li>3. Enter the VA number above</li>
                  <li>4. Confirm and complete your payment</li>
                </ul>
                <div className="text-sm text-gray-500">
                  <p>Expires at: {new Date(paymentData.expiredAt).toLocaleString()}</p>
                </div>
              </div>
            ) : null}

            <div className="flex justify-center gap-3 mt-6">
              <Button
                onClick={() => setShowPaymentDialog(false)}
                variant="outline"
                disabled={isCheckingPayment}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowPaymentDialog(false)}
                disabled={isCheckingPayment}
              >
                {isCheckingPayment ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking Payment...
                  </>
                ) : (
                  "I have completed the payment"
                )}
              </Button>
            </div>
          </div>
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