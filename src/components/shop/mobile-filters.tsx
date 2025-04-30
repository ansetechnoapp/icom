"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { FilterSidebar } from "./filter-sidebar";

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

interface MobileFiltersProps {
  categories: FilterGroup;
  brands: FilterGroup;
  priceRange: PriceRange;
  specifications: FilterGroup[];
}

export function MobileFilters({
  categories,
  brands,
  priceRange,
  specifications,
}: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-md p-0 sm:max-w-md">
        <FilterSidebar
          categories={categories}
          brands={brands}
          priceRange={priceRange}
          specifications={specifications}
          isMobile={true}
          onClose={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
