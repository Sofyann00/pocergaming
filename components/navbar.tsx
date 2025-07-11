"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { User, LogOut, Search, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { user, logout } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <img 
              src="/app_icon.png" 
              alt="pocergeming Logo"
              width={252}
              height={252}
              className="brightness-100"
            />
          </Link>
          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                pathname === "/"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
            >
              Home
            </Link>
            <Link
              href="/voucher"
              className={cn(
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                pathname === "/voucher"
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              )}
            >
              Special Vouchers
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
          <div className="relative hidden md:block w-64">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
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
                  className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hidden md:flex px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200">
          <div className="px-2 sm:px-4 py-2">
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              <Link
                href="/"
                className={cn(
                  "block px-4 py-2 text-sm font-medium rounded-lg",
                  pathname === "/"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/voucher"
                className={cn(
                  "block px-4 py-2 text-sm font-medium rounded-lg",
                  pathname === "/voucher"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Special Vouchers
              </Link>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      router.push("/")
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-50 rounded-lg flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block mx-4 px-4 py-2 text-sm text-center font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}