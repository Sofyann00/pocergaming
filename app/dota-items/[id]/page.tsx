"use client"

import { useState } from "react"
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
} from "@/components/ui/dialog"
import { useUser } from "@/contexts/user-context"
import Link from "next/link"

const dotaItems = [
  {
    id: "1",
    name: "Doom's Infernal Blade",
    hero: "Doom",
    image: "/dota_item/doom_weapon.png",
    price: 25000,
    description: "Mythical weapon for Doom with custom particle effects",
    seller: {
      id: "1",
      name: "Genggam Dunia Game",
      rating: 5.0,
      avatar: "/seller_ic/gdg_ic.png",
      slug: "genggam-dunia-game"
    }
  },
  {
    id: "2",
    name: "Terrorblade's Demon Edge",
    hero: "Terrorblade",
    image: "/dota_item/tb_full.png",
    price: 30000,
    description: "Legendary weapon for Terrorblade with demonic effects",
    seller: {
      id: "1",
      name: "Genggam Dunia Game",
      rating: 5.0,
      avatar: "/seller_ic/gdg_ic.png",
      slug: "genggam-dunia-game"
    }
  },
  {
    id: "3",
    name: "Ursa's Savage Claws",
    hero: "Ursa",
    image: "/dota_item/ursa_back.png",
    price: 22000,
    description: "Rare back item for Ursa with custom animations",
    seller: {
      id: "2",
      name: "Sahabat Gaming",
      rating: 5.0,
      avatar: "/seller_ic/sg_ic.png",
      slug: "sahabat-gaming"
    }
  },
  {
    id: "4",
    name: "Razor's Storm Blade",
    hero: "Razor",
    image: "/dota_item/razor_weapon.png",
    price: 28000,
    description: "Epic weapon for Razor with lightning effects",
    seller: {
      id: "2",
      name: "Sahabat Gaming",
      rating: 5.0,
      avatar: "/seller_ic/sg_ic.png",
      slug: "sahabat-gaming"
    }
  },
  {
    id: "5",
    name: "Venomancer's Toxic Mantle",
    hero: "Venomancer",
    image: "/dota_item/venomaner_top.png",
    price: 18000,
    description: "Rare top item for Venomancer with poison effects",
    seller: {
      id: "3",
      name: "Kasih Game Store",
      rating: 5.0,
      avatar: "/seller_ic/kgs_ic.png",
      slug: "kasih-game-store"
    }
  },
  {
    id: "6",
    name: "Mirana's Starfall Shoulders",
    hero: "Mirana",
    image: "/dota_item/mirana_shoulder.png",
    price: 32000,
    description: "Legendary shoulder item for Mirana with star effects",
    seller: {
      id: "3",
      name: "Kasih Game Store",
      rating: 5.0,
      avatar: "/seller_ic/kgs_ic.png",
      slug: "kasih-game-store"
    }
  },
  {
    id: "7",
    name: "Chaos Knight's Armor",
    hero: "Chaos Knight",
    image: "/dota_item/ck_shoulder.png",
    price: 35000,
    description: "Mythical shoulder armor for Chaos Knight",
    seller: {
      id: "4",
      name: "TopUp1212",
      rating: 5.0,
      avatar: "/seller_ic/t12_ic.png",
      slug: "topup1212"
    }
  },
  {
    id: "8",
    name: "Night Stalker's Wings",
    hero: "Night Stalker",
    image: "/dota_item/ns_wings.png",
    price: 27000,
    description: "Rare wings for Night Stalker with night effects",
    seller: {
      id: "4",
      name: "TopUp1212",
      rating: 5.0,
      avatar: "/seller_ic/t12_ic.png",
      slug: "topup1212"
    }
  },
  {
    id: "9",
    name: "Axe's Mythical Axe",
    hero: "Axe",
    image: "/dota_item/axe_myth.png",
    price: 29000,
    description: "Mythical weapon for Axe with custom animations",
    seller: {
      id: "5",
      name: "Legenda TopUp",
      rating: 5.0,
      avatar: "/seller_ic/lgt_ic.png",
      slug: "legenda-topup"
    }
  },
  {
    id: "10",
    name: "Nyx's Immortal Carapace",
    hero: "Nyx Assassin",
    image: "/dota_item/nyx_immo.png",
    price: 1200000,
    description: "Immortal back item for Nyx Assassin",
    seller: {
      id: "5",
      name: "Legenda TopUp",
      rating: 5.0,
      avatar: "/seller_ic/lgt_ic.png",
      slug: "legenda-topup"
    }
  }
]

export default function DotaItemPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const { user } = useUser()
  const [steamTradeLink, setSteamTradeLink] = useState("")
  const [sellerNotes, setSellerNotes] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isCheckingPayment, setIsCheckingPayment] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)
  const { Canvas } = useQRCode()

  const item = dotaItems.find(i => i.id === params.id)

  if (!item) {
    return <div>Item not found</div>
  }

  const handlePurchase = async () => {
    if (!user) {
        toast({
          title: "Login Required",
          description: "Please login to continue with your purchase.",
          variant: "destructive"
        })
        return
      }
    if (!steamTradeLink) {
      toast({
        title: "Missing Information",
        description: "Please provide your Steam Trade Offer link.",
        variant: "destructive"
      })
      return
    }

    if (!selectedPayment) {
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
          reference: `dota-item-${Date.now()}`,
          inputCurrency: "IDR",
          balanceType: "fiat",
          paymentMethod: selectedPayment,
          inputAmount: item.price
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
      });
    } finally {
      setIsLoadingPayment(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Item Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
              {item.hero}
            </div>
            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            <p className="text-gray-600 mb-6">{item.description}</p>
            <div className="flex items-center gap-2 mb-6">
              <Link href={`/seller/${item.seller.slug}`} className="flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src={item.seller.avatar}
                  alt="Seller Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm font-medium">{item.seller.name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({item.seller.rating})</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-6">
              {item.price.toLocaleString('id-ID')} IDR
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Purchase Information</h2>
          
          <div className="space-y-6">
            {/* Steam Trade Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Steam Trade Offer Link <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="https://steamcommunity.com/tradeoffer/new/..."
                value={steamTradeLink}
                onChange={(e) => setSteamTradeLink(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-2">
                Please provide your Steam Trade Offer link where you want to receive the item
              </p>
            </div>

            {/* Seller Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes for Seller (Optional)
              </label>
              <Textarea
                placeholder="Any special instructions or requests..."
                value={sellerNotes}
                onChange={(e) => setSellerNotes(e.target.value)}
                className="w-full"
                rows={3}
              />
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
              
              {/* QRIS */}
              <button
                onClick={() => setSelectedPayment('qris')}
                className={cn(
                  "w-full p-4 rounded-lg border mb-3 flex items-center justify-between",
                  selectedPayment === 'qris'
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/qris_img.png"
                    alt="QRIS"
                    width={60}
                    height={24}
                    className="object-contain"
                  />
                  <span>QRIS</span>
                </div>
                <span className="text-gray-600">
                  {item.price.toLocaleString('id-ID')} IDR
                </span>
              </button>

              {/* Virtual Account */}
              <button
                onClick={() => setSelectedPayment('va_permata')}
                className={cn(
                  "w-full p-4 rounded-lg border flex items-center justify-between",
                  selectedPayment === 'va_permata'
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <span>Virtual Account</span>
                </div>
                <span className="text-gray-600">
                  {item.price.toLocaleString('id-ID')} IDR
                </span>
              </button>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handlePurchase}
              disabled={isLoadingPayment}
            >
              {isLoadingPayment ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Purchase Now"
              )}
            </Button>
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
                Total Amount: {item.price.toLocaleString('id-ID')} IDR
              </p>
              <p className="text-sm text-gray-500">
                {item.name} ({item.hero})
              </p>
            </div>

            {selectedPayment === 'qris' && paymentData?.paymentFiat?.qrData ? (
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
            ) : selectedPayment === 'va_permata' && paymentData?.paymentFiat ? (
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
      <PaymentSuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        paymentData={paymentData}
        productData={item}
        selectedItem={{
          ...item,
          steamTradeLink,
          sellerNotes
        }}
      />
    </div>
  )
} 