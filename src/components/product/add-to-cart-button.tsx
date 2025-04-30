"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useCart } from "../../lib/cart";
import { cn } from "../../lib/utils";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity?: number;
  variants?: Record<string, string>;
  className?: string;
  showQuantity?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function AddToCartButton({
  product,
  quantity = 1,
  variants,
  className,
  showQuantity = false,
  disabled = false,
  children,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      variants,
    });

    setIsAdded(true);
    setIsAnimating(true);

    // Reset the added state after animation
    setTimeout(() => {
      setIsAdded(false);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAnimating || disabled}
      className={cn("relative overflow-hidden", className)}
    >
      {children ? (
        <span className={cn(isAdded && "invisible")}>
          {children}
        </span>
      ) : (
        <span className={cn("flex items-center gap-2", isAdded && "invisible")}>
          <ShoppingCart className="h-4 w-4" />
          {showQuantity ? `Add to Cart (${quantity})` : "Add to Cart"}
        </span>
      )}

      {isAdded && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            {!children && "Added to Cart"}
          </span>
        </motion.div>
      )}
    </Button>
  );
}
