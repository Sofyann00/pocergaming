"use client"

import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

// Helper function to create slug from name
const createSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-')
}

interface VoucherItem {
  id: string
  name: string
  price: number
  iconUrl: string
  description: string
}

interface Seller {
  id: string
  name: string
  rating: number
  avatar: string
  items: VoucherItem[]
}

interface VoucherWithSeller extends VoucherItem {
  seller: {
    name: string
    rating: number
    avatar: string
    slug: string
  }
}

const agents: Seller[] = [
  {
    id: "1",
    name: "Genggam Dunia Game",
    rating: 5.0,
    avatar: "/seller_ic/gdg_ic.png",
    items: [
      {
        id: "1",
        name: "60 Diamonds",
        price: 16000,
        iconUrl: "/voucher_ic/diamond_ic.png",
        description: "Mobile Legends Diamond Voucher"
      },
      {
        id: "2",
        name: "300 Diamonds",
        price: 79000,
        iconUrl: "/voucher_ic/diamond_ic.png",
        description: "Mobile Legends Diamond Voucher"
      }
    ]
  },
  {
    id: "2",
    name: "Sahabat Gaming",
    rating: 5.0,
    avatar: "/seller_ic/sg_ic.png",
    items: [
      {
        id: "3",
        name: "980 Diamonds",
        price: 249000,
        iconUrl: "/voucher_ic/diamond_ic.png",
        description: "Mobile Legends Diamond Voucher"
      },
      {
        id: "4",
        name: "1980 Diamonds",
        price: 479000,
        iconUrl: "/voucher_ic/diamond_ic.png",
        description: "Mobile Legends Diamond Voucher"
      }
    ]
  },
  {
    id: "3",
    name: "Kasih Game Store",
    rating: 5.0,
    avatar: "/seller_ic/kgs_ic.png",
    items: [
      {
        id: "5",
        name: "3280 Diamonds",
        price: 799000,
        iconUrl: "/voucher_ic/diamond_ic.png",
        description: "Mobile Legends Diamond Voucher"
      },
      {
        id: "6",
        name: "6480 Diamonds",
        price: 1599000,
        iconUrl: "/voucher_ic/diamond_ic.png",
        description: "Mobile Legends Diamond Voucher"
      }
    ]
  }
]

export default function VoucherPage() {
  // Flatten all items into a single array
  const allItems: VoucherWithSeller[] = agents.flatMap(agent => 
    agent.items.map(item => ({
      ...item,
      seller: {
        name: agent.name,
        rating: agent.rating,
        avatar: agent.avatar,
        slug: createSlug(agent.name)
      }
    }))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Game Vouchers</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allItems.map((item) => (
            <Link
              key={item.id}
              href={`/voucher/${item.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-square">
                  <Image
                    src={item.iconUrl}
                    alt={item.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    Voucher
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="h-10 mb-2">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-blue-600 font-semibold">
                      {item.price.toLocaleString('id-ID')} IDR
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Link 
                      href={`/seller/${item.seller.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-md transition-colors"
                    >
                      <Image
                        src={item.seller.avatar}
                        alt={item.seller.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                          {item.seller.name}
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3",
                                i < Math.floor(item.seller.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({item.seller.rating})
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 