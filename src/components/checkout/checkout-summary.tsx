"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CheckoutSummary() {
  const { items, subtotal } = useCart();
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  const shippingCost = 0; // Free shipping for this example
  const taxRate = 0.07; // 7% tax rate
  const taxAmount = (subtotal - promoDiscount) * taxRate;
  const total = subtotal - promoDiscount + shippingCost + taxAmount;

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setPromoError(null);

    // Simulate API call to validate promo code
    setTimeout(() => {
      if (promoCode.toUpperCase() === "WELCOME10") {
        setPromoDiscount(subtotal * 0.1); // 10% discount
      } else {
        setPromoError("Invalid promo code");
        setPromoDiscount(0);
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => setIsCartExpanded(!isCartExpanded)}
            className="flex w-full items-center justify-between"
          >
            <span className="font-medium">
              {items.length} {items.length === 1 ? "item" : "items"} in cart
            </span>
            {isCartExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isCartExpanded && (
            <div className="space-y-4 pt-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="line-clamp-1 text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </span>
                    <span className="mt-auto text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            <Input
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="rounded-r-none"
            />
            <Button
              onClick={handleApplyPromoCode}
              disabled={isApplyingPromo || !promoCode.trim()}
              className="rounded-l-none"
            >
              {isApplyingPromo ? "Applying..." : "Apply"}
            </Button>
          </div>
          {promoError && (
            <p className="mt-1 text-xs text-destructive">{promoError}</p>
          )}
          {promoDiscount > 0 && (
            <p className="mt-1 text-xs text-green-600">
              Promo code applied successfully!
            </p>
          )}
        </div>

        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {promoDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600">
                -{formatPrice(promoDiscount)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatPrice(taxAmount)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
