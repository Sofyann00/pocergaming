"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useUser } from "@/contexts/user-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useUser()
  const { state } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/marketplace",
      label: "product",
      active: pathname === "/marketplace",
    },
  ]

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                  }`}
                >
                  {route.label}
                </Link>
              ))}
              <div className="border-t pt-4">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center mt-4 text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-x-2 ml-4 lg:ml-0">
        <img 
                src="/app_icon.png" 
                alt="pocergaming Logo"
                width={62}
                height={62}
                className="brightness-100"
              />
          <span className="text-xl font-bold">pocergaming</span>
        </div>

        <nav className="mx-6 hidden lg:flex items-center space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-x-4">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {state.items.length > 0 && (
              <Badge 
                className="absolute top-0 -right-1 h-5 w-5 flex items-center justify-center bg-destructive text-destructive-foreground p-0 text-xs"
                variant="destructive"
              >
                {state.items.length}
              </Badge>
            )}
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}