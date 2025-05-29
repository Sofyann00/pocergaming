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

const agents = [
  {
    id: "1",
    name: "Genggam Dunia Game",
    rating: 5.0,
    avatar: "/seller_ic/gdg_ic.png",
    items: [
      {
        id: "1",
        name: "Doom's Infernal Blade",
        hero: "Doom",
        image: "/dota_item/doom_weapon.png",
        price: 25000,
        description: "Mythical weapon for Doom with custom particle effects"
      },
      {
        id: "2",
        name: "Terrorblade's Demon Edge",
        hero: "Terrorblade",
        image: "/dota_item/tb_full.png",
        price: 30000,
        description: "Legendary weapon for Terrorblade with demonic effects"
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
        name: "Ursa's Savage Claws",
        hero: "Ursa",
        image: "/dota_item/ursa_back.png",
        price: 22000,
        description: "Rare back item for Ursa with custom animations"
      },
      {
        id: "4",
        name: "Razor's Storm Blade",
        hero: "Razor",
        image: "/dota_item/razor_weapon.png",
        price: 28000,
        description: "Epic weapon for Razor with lightning effects"
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
        name: "Venomancer's Toxic Mantle",
        hero: "Venomancer",
        image: "/dota_item/venomaner_top.png",
        price: 18000,
        description: "Rare top item for Venomancer with poison effects"
      },
      {
        id: "6",
        name: "Mirana's Starfall Shoulders",
        hero: "Mirana",
        image: "/dota_item/mirana_shoulder.png",
        price: 32000,
        description: "Legendary shoulder item for Mirana with star effects"
      }
    ]
  },
  {
    id: "4",
    name: "TopUp1212",
    rating: 5.0,
    avatar: "/seller_ic/t12_ic.png",
    items: [
      {
        id: "7",
        name: "Chaos Knight's Armor",
        hero: "Chaos Knight",
        image: "/dota_item/ck_shoulder.png",
        price: 35000,
        description: "Mythical shoulder armor for Chaos Knight"
      },
      {
        id: "8",
        name: "Night Stalker's Wings",
        hero: "Night Stalker",
        image: "/dota_item/ns_wings.png",
        price: 27000,
        description: "Rare wings for Night Stalker with night effects"
      }
    ]
  },
  {
    id: "5",
    name: "Legenda TopUp",
    rating: 5.0,
    avatar: "/seller_ic/lgt_ic.png",
    items: [
      {
        id: "9",
        name: "Axe's Mythical Axe",
        hero: "Axe",
        image: "/dota_item/axe_myth.png",
        price: 29000,
        description: "Mythical weapon for Axe with custom animations"
      },
      {
        id: "10",
        name: "Nyx's Immortal Carapace",
        hero: "Nyx Assassin",
        image: "/dota_item/nyx_immo.png",
        price: 1200000,
        description: "Immortal back item for Nyx Assassin"
      }
    ]
  }
]

export default function AgentPage() {
  // Flatten all items into a single array
  const allItems = agents.flatMap(agent => 
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
        <h1 className="text-2xl font-bold mb-6">Dota 2 Items</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allItems.map((item) => (
            <Link
              key={item.id}
              href={`/dota-items/${item.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    {item.hero}
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