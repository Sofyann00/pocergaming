"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { User, LogOut, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/data"

export function Navbar() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <img 
              src="/app_icon.png" 
              alt="pocergaming Logo"
              width={252}
              height={252}
              className="brightness-100"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSearchQuery("")
                        setShowSearchResults(false)
                      }}
                    >
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {product.category}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-500 text-center">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User className="h-5 w-5 text-gray-700" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      logout()
                      router.push("/")
                    }}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}