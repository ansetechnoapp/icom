"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Share2, ShieldCheck, Truck, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  price?: number;
  inStock: boolean;
}

interface ProductInfoProps {
  id: string;
  name: string;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  sku: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  variants?: {
    name: string;
    options: Variant[];
  }[];
  className?: string;
}

export function ProductInfo({
  id,
  name,
  brand,
  sku,
  price,
  salePrice,
  rating,
  reviewCount,
  stock,
  description,
  variants,
  className,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const isOnSale = !!salePrice;
  const isInStock = stock > 0;
  const discount = isOnSale
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  const handleQuantityChange = (value: number) => {
    if (value < 1 || value > stock) return;
    setQuantity(value);
  };

  const handleVariantChange = (variantName: string, optionId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: optionId,
    }));
  };

  const handleAddToCart = () => {
    // In a real application, this would add the product to the cart
    console.log("Adding to cart:", {
      id,
      name,
      quantity,
      variants: selectedVariants,
    });
  };

  const handleBuyNow = () => {
    // In a real application, this would add the product to the cart and redirect to checkout
    console.log("Buying now:", {
      id,
      name,
      quantity,
      variants: selectedVariants,
    });
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-2">
        <Link
          href={`/brands/${brand.slug}`}
          className="text-sm font-medium text-muted-foreground hover:text-primary"
        >
          {brand.name}
        </Link>
      </div>

      <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {name}
      </h1>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : i < rating
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "fill-muted text-muted"
              )}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            ({reviewCount} reviews)
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          SKU: <span className="font-medium">{sku}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2">
          {isOnSale && salePrice ? (
            <>
              <span className="text-3xl font-bold text-primary">
                ${salePrice.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
              <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                Save {discount}%
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold">${price.toFixed(2)}</span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Price includes taxes. Shipping calculated at checkout.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2">
          {isInStock ? (
            <div className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              In Stock
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-sm font-medium text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              Out of Stock
            </div>
          )}
          {isInStock && stock <= 10 && (
            <span className="text-sm text-amber-600">
              Only {stock} left in stock
            </span>
          )}
        </div>
      </div>

      {variants && variants.length > 0 && (
        <div className="mb-6 space-y-4">
          {variants.map((variant) => (
            <div key={variant.name}>
              <label className="mb-2 block text-sm font-medium">
                {variant.name}
              </label>
              <Select
                value={selectedVariants[variant.name] || ""}
                onValueChange={(value) =>
                  handleVariantChange(variant.name, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={`Select ${variant.name.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {variant.options.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                      disabled={!option.inStock}
                    >
                      {option.name}
                      {option.price !== undefined && option.price !== null && ` (+$${option.price.toFixed(2)})`}
                      {!option.inStock && " - Out of Stock"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Quantity</label>
        <div className="flex h-10 w-32 items-center overflow-hidden rounded-md border">
          <button
            className="flex h-full w-10 items-center justify-center border-r text-muted-foreground transition-colors hover:bg-muted"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="h-full w-full border-0 bg-transparent text-center focus:outline-none focus:ring-0"
            aria-label="Quantity"
          />
          <button
            className="flex h-full w-10 items-center justify-center border-l text-muted-foreground transition-colors hover:bg-muted"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= stock}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <AddToCartButton
          product={{
            id,
            name,
            price: salePrice || price,
            image: "/images/products/placeholder.svg", // This would be the first image in a real app
          }}
          quantity={quantity}
          variants={selectedVariants}
          className="flex-1 h-12"
          showQuantity={true}
          disabled={!isInStock}
        />
        <Button
          size="lg"
          variant="secondary"
          className="flex-1"
          onClick={handleBuyNow}
          disabled={!isInStock}
        >
          Buy Now
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12"
          aria-label="Share product"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-6 space-y-3 rounded-lg border p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <h4 className="text-sm font-medium">2-Year Warranty</h4>
            <p className="text-xs text-muted-foreground">
              All products come with a minimum 2-year warranty.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <h4 className="text-sm font-medium">Free Shipping</h4>
            <p className="text-xs text-muted-foreground">
              On orders over $99. Same-day dispatch for orders placed before 2 PM.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <h4 className="text-sm font-medium">30-Day Returns</h4>
            <p className="text-xs text-muted-foreground">
              Not satisfied? Return within 30 days for a full refund.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium">Description</h3>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
