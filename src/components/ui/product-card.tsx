"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./button";
import { AddToCartButton } from "../product/add-to-cart-button";
import { cn } from "../../lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;
  const isOnSale = !!product.salePrice;
  const isOutOfStock = product.stock <= 0;

  return (
    <motion.div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {(product.isNew || isOnSale) && (
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
              New
            </span>
          )}
          {isOnSale && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              -{discount}%
            </span>
          )}
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Add to wishlist"
      >
        <Heart className="h-5 w-5" />
      </Button>

      <Link href={`/products/${product.slug}`} className="relative mb-4 pt-[100%]">
        <div className="absolute inset-0 overflow-hidden rounded-md">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered && product.images.length > 1
                ? "opacity-0"
                : "opacity-100"
            )}
          />
          {product.images.length > 1 && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </div>
      </Link>

      <div className="mb-2 flex items-center">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : i < product.rating
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "fill-muted text-muted"
              )}
            />
          ))}
        </div>
        <span className="ml-2 text-xs text-muted-foreground">
          ({product.reviewCount})
        </span>
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="mb-2 line-clamp-2 flex-grow text-base font-medium hover:text-primary"
      >
        {product.name}
      </Link>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isOnSale && product.salePrice ? (
            <>
              <span className="text-lg font-bold text-primary">
                ${product.salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            image: product.images[0],
          }}
          className="h-8 w-8 rounded-full p-0 bg-transparent hover:bg-muted text-foreground"
          disabled={isOutOfStock}
        >
          <ShoppingCart className="h-4 w-4" />
        </AddToCartButton>
      </div>

      {isOutOfStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <span className="rounded-md bg-destructive px-2 py-1 text-sm font-medium text-destructive-foreground">
            Out of Stock
          </span>
        </div>
      )}
    </motion.div>
  );
}
