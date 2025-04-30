"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";

interface FilterOption {
  id: string;
  name: string;
  count: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterSidebarProps {
  categories: FilterGroup;
  brands: FilterGroup;
  priceRange: PriceRange;
  specifications: FilterGroup[];
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({
  categories,
  brands,
  priceRange,
  specifications,
  className,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "categories",
    "brands",
    "price",
  ]);

  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([
    priceRange.min,
    priceRange.max,
  ]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isGroupExpanded = (groupId: string) => {
    return expandedGroups.includes(groupId);
  };

  const handlePriceChange = (values: number[]) => {
    setSelectedPrice([values[0], values[1]]);
  };

  const applyFilters = () => {
    // In a real application, this would update the URL with the selected filters
    // and trigger a new search
    if (onClose && isMobile) {
      onClose();
    }
  };

  const resetFilters = () => {
    // In a real application, this would clear all filters
    setSelectedPrice([priceRange.min, priceRange.max]);
    if (onClose && isMobile) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-background",
        isMobile ? "px-4 pb-4 pt-2" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-medium">Filters</h2>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-4">
        {/* Categories */}
        <div className="mb-6">
          <button
            onClick={() => toggleGroup("categories")}
            className="flex w-full items-center justify-between text-left"
          >
            <h3 className="text-base font-medium">Categories</h3>
            {isGroupExpanded("categories") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isGroupExpanded("categories") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 space-y-2"
            >
              {categories.options.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="flex-1 text-sm"
                  >
                    {category.name}
                    <span className="ml-1 text-muted-foreground">
                      ({category.count})
                    </span>
                  </Label>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Brands */}
        <div className="mb-6">
          <button
            onClick={() => toggleGroup("brands")}
            className="flex w-full items-center justify-between text-left"
          >
            <h3 className="text-base font-medium">Brands</h3>
            {isGroupExpanded("brands") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isGroupExpanded("brands") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 space-y-2"
            >
              {brands.options.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand.id}`} />
                  <Label
                    htmlFor={`brand-${brand.id}`}
                    className="flex-1 text-sm"
                  >
                    {brand.name}
                    <span className="ml-1 text-muted-foreground">
                      ({brand.count})
                    </span>
                  </Label>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <button
            onClick={() => toggleGroup("price")}
            className="flex w-full items-center justify-between text-left"
          >
            <h3 className="text-base font-medium">Price Range</h3>
            {isGroupExpanded("price") ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isGroupExpanded("price") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 px-2"
            >
              <Slider
                defaultValue={[priceRange.min, priceRange.max]}
                min={priceRange.min}
                max={priceRange.max}
                step={10}
                value={[selectedPrice[0], selectedPrice[1]]}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <div className="rounded-md border px-2 py-1 text-sm">
                  ${selectedPrice[0]}
                </div>
                <div className="rounded-md border px-2 py-1 text-sm">
                  ${selectedPrice[1]}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Specifications */}
        {specifications.map((spec) => (
          <div key={spec.id} className="mb-6">
            <button
              onClick={() => toggleGroup(spec.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-base font-medium">{spec.name}</h3>
              {isGroupExpanded(spec.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {isGroupExpanded(spec.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 space-y-2"
              >
                {spec.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox id={`${spec.id}-${option.id}`} />
                    <Label
                      htmlFor={`${spec.id}-${option.id}`}
                      className="flex-1 text-sm"
                    >
                      {option.name}
                      <span className="ml-1 text-muted-foreground">
                        ({option.count})
                      </span>
                    </Label>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {isMobile && (
        <div className="flex gap-2 border-t pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button className="flex-1" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}
