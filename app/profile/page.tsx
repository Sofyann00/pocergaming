"use client";

import { useUser } from "@/contexts/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import createIcon from "ethereum-blockies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BlockiesAvatar } from "../../components/ui/blockies-avatar";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (!isLoading && !user) {
        router.push("/login");
        return;
      }
    }, 1000); // Wait 1 second before checking

    return () => clearTimeout(redirectTimer); // Cleanup timeout
  }, [user, router, isLoading]);

  // Wait for user session to be loaded
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!user) {
    return null; // or another loading state if needed
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-x-4 mb-8">
        <Avatar className="h-20 w-20">
          <BlockiesAvatar
            seed={user.email}
      
            scale={10}
            className="h-20 w-20"
          />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6 space-y-4">
          {user.orders.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">
                  No orders yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            user.orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Order #{order.id}</span>
                    <span>Rp {order.total.toLocaleString("id-ID")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Status: {order.status}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p>Shipping to: {order.shippingAddress}</p>
                    <p>Courier: {order.courier}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Profile settings coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
