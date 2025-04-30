"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Search, SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Component {
  id: string;
  type: string;
  name: string;
  price: number;
  image: string;
  wattage: number;
  specs: Record<string, string>;
}

interface ComponentType {
  id: string;
  name: string;
  icon: string;
  required: boolean;
}

interface ComponentSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  componentType: ComponentType | null;
  onSelectComponent: (component: Component) => void;
}

export function ComponentSelector({
  isOpen,
  onClose,
  componentType,
  onSelectComponent,
}: ComponentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for development
  const getComponentsByType = (type: string): Component[] => {
    switch (type) {
      case "cpu":
        return [
          {
            id: "cpu-1",
            type: "cpu",
            name: "AMD Ryzen 9 7950X",
            price: 699.99,
            image: "/images/products/cpu-1.jpg",
            wattage: 170,
            specs: {
              Cores: "16",
              Threads: "32",
              BaseFrequency: "4.5 GHz",
              BoostFrequency: "5.7 GHz",
              Socket: "AM5",
              TDP: "170W",
            },
          },
          {
            id: "cpu-2",
            type: "cpu",
            name: "Intel Core i9-14900K",
            price: 589.99,
            image: "/images/products/cpu-1.jpg",
            wattage: 150,
            specs: {
              Cores: "24 (8P+16E)",
              Threads: "32",
              BaseFrequency: "3.2 GHz",
              BoostFrequency: "6.0 GHz",
              Socket: "LGA 1700",
              TDP: "150W",
            },
          },
          {
            id: "cpu-3",
            type: "cpu",
            name: "AMD Ryzen 7 7800X3D",
            price: 449.99,
            image: "/images/products/cpu-1.jpg",
            wattage: 120,
            specs: {
              Cores: "8",
              Threads: "16",
              BaseFrequency: "4.2 GHz",
              BoostFrequency: "5.0 GHz",
              Socket: "AM5",
              TDP: "120W",
            },
          },
        ];
      case "motherboard":
        return [
          {
            id: "mb-1",
            type: "motherboard",
            name: "ASUS ROG Strix X670E-E Gaming WiFi",
            price: 499.99,
            image: "/images/products/motherboard-1.jpg",
            wattage: 25,
            specs: {
              Socket: "AM5",
              Chipset: "X670E",
              FormFactor: "ATX",
              MemorySlots: "4",
              MaxMemory: "128GB",
              PCIeSlots: "3",
            },
          },
          {
            id: "mb-2",
            type: "motherboard",
            name: "MSI MPG Z790 CARBON WIFI",
            price: 399.99,
            image: "/images/products/motherboard-1.jpg",
            wattage: 25,
            specs: {
              Socket: "LGA 1700",
              Chipset: "Z790",
              FormFactor: "ATX",
              MemorySlots: "4",
              MaxMemory: "128GB",
              PCIeSlots: "4",
            },
          },
          {
            id: "mb-3",
            type: "motherboard",
            name: "Gigabyte B650 AORUS ELITE AX",
            price: 229.99,
            image: "/images/products/motherboard-1.jpg",
            wattage: 20,
            specs: {
              Socket: "AM5",
              Chipset: "B650",
              FormFactor: "ATX",
              MemorySlots: "4",
              MaxMemory: "128GB",
              PCIeSlots: "2",
            },
          },
        ];
      case "memory":
        return [
          {
            id: "ram-1",
            type: "memory",
            name: "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR5 6000MHz",
            price: 189.99,
            image: "/images/products/ram-1.jpg",
            wattage: 10,
            specs: {
              Capacity: "32GB (2x16GB)",
              Type: "DDR5",
              Speed: "6000MHz",
              CASLatency: "36",
              Voltage: "1.35V",
            },
          },
          {
            id: "ram-2",
            type: "memory",
            name: "G.SKILL Trident Z5 RGB 32GB (2x16GB) DDR5 6400MHz",
            price: 219.99,
            image: "/images/products/ram-1.jpg",
            wattage: 10,
            specs: {
              Capacity: "32GB (2x16GB)",
              Type: "DDR5",
              Speed: "6400MHz",
              CASLatency: "32",
              Voltage: "1.4V",
            },
          },
          {
            id: "ram-3",
            type: "memory",
            name: "Kingston FURY Beast 64GB (2x32GB) DDR5 5600MHz",
            price: 259.99,
            image: "/images/products/ram-1.jpg",
            wattage: 12,
            specs: {
              Capacity: "64GB (2x32GB)",
              Type: "DDR5",
              Speed: "5600MHz",
              CASLatency: "40",
              Voltage: "1.25V",
            },
          },
        ];
      case "storage":
        return [
          {
            id: "ssd-1",
            type: "storage",
            name: "Samsung 990 PRO 2TB NVMe SSD",
            price: 249.99,
            image: "/images/products/ssd-1.jpg",
            wattage: 8,
            specs: {
              Capacity: "2TB",
              Interface: "PCIe 4.0 x4",
              FormFactor: "M.2 2280",
              ReadSpeed: "7450 MB/s",
              WriteSpeed: "6900 MB/s",
              Endurance: "1200 TBW",
            },
          },
          {
            id: "ssd-2",
            type: "storage",
            name: "WD_BLACK SN850X 1TB NVMe SSD",
            price: 149.99,
            image: "/images/products/ssd-1.jpg",
            wattage: 7,
            specs: {
              Capacity: "1TB",
              Interface: "PCIe 4.0 x4",
              FormFactor: "M.2 2280",
              ReadSpeed: "7300 MB/s",
              WriteSpeed: "6300 MB/s",
              Endurance: "600 TBW",
            },
          },
          {
            id: "ssd-3",
            type: "storage",
            name: "Crucial T700 4TB NVMe SSD",
            price: 499.99,
            image: "/images/products/ssd-1.jpg",
            wattage: 9,
            specs: {
              Capacity: "4TB",
              Interface: "PCIe 5.0 x4",
              FormFactor: "M.2 2280",
              ReadSpeed: "12400 MB/s",
              WriteSpeed: "11800 MB/s",
              Endurance: "2400 TBW",
            },
          },
        ];
      case "gpu":
        return [
          {
            id: "gpu-1",
            type: "gpu",
            name: "NVIDIA GeForce RTX 4080 Super 16GB",
            price: 1099.99,
            image: "/images/products/gpu-1.jpg",
            wattage: 320,
            specs: {
              VRAM: "16GB GDDR6X",
              CUDACores: "10240",
              BoostClock: "2.55 GHz",
              Interface: "PCIe 4.0",
              PowerConnector: "16-pin",
              Length: "304mm",
            },
          },
          {
            id: "gpu-2",
            type: "gpu",
            name: "AMD Radeon RX 7900 XTX 24GB",
            price: 949.99,
            image: "/images/products/gpu-1.jpg",
            wattage: 355,
            specs: {
              VRAM: "24GB GDDR6",
              StreamProcessors: "12288",
              BoostClock: "2.5 GHz",
              Interface: "PCIe 4.0",
              PowerConnector: "2x 8-pin",
              Length: "287mm",
            },
          },
          {
            id: "gpu-3",
            type: "gpu",
            name: "NVIDIA GeForce RTX 4070 Ti Super 16GB",
            price: 799.99,
            image: "/images/products/gpu-1.jpg",
            wattage: 285,
            specs: {
              VRAM: "16GB GDDR6X",
              CUDACores: "8448",
              BoostClock: "2.61 GHz",
              Interface: "PCIe 4.0",
              PowerConnector: "16-pin",
              Length: "285mm",
            },
          },
        ];
      case "case":
        return [
          {
            id: "case-1",
            type: "case",
            name: "Lian Li O11 Dynamic EVO",
            price: 169.99,
            image: "/images/products/case-1.jpg",
            wattage: 0,
            specs: {
              FormFactor: "Mid Tower",
              Motherboards: "E-ATX, ATX, Micro-ATX, Mini-ITX",
              Dimensions: "465 x 285 x 459 mm",
              DriveSlots: "6x 2.5\", 2x 3.5\"",
              FanSupport: "10x 120mm or 7x 140mm",
              RadiatorSupport: "360mm Top, Side, Bottom",
            },
          },
          {
            id: "case-2",
            type: "case",
            name: "Corsair 5000D Airflow",
            price: 174.99,
            image: "/images/products/case-1.jpg",
            wattage: 0,
            specs: {
              FormFactor: "Mid Tower",
              Motherboards: "ATX, Micro-ATX, Mini-ITX",
              Dimensions: "520 x 245 x 520 mm",
              DriveSlots: "4x 2.5\", 2x 3.5\"",
              FanSupport: "10x 120mm or 4x 140mm",
              RadiatorSupport: "360mm Front, Top, Side",
            },
          },
          {
            id: "case-3",
            type: "case",
            name: "Fractal Design Meshify 2",
            price: 149.99,
            image: "/images/products/case-1.jpg",
            wattage: 0,
            specs: {
              FormFactor: "Mid Tower",
              Motherboards: "E-ATX, ATX, Micro-ATX, Mini-ITX",
              Dimensions: "474 x 230 x 505 mm",
              DriveSlots: "4x 2.5\", 2x 3.5\"",
              FanSupport: "9x 120mm or 7x 140mm",
              RadiatorSupport: "360mm Front, Top",
            },
          },
        ];
      case "psu":
        return [
          {
            id: "psu-1",
            type: "psu",
            name: "Corsair RM850x 850W 80+ Gold",
            price: 129.99,
            image: "/images/products/psu-1.jpg",
            wattage: 850,
            specs: {
              Wattage: "850W",
              Efficiency: "80+ Gold",
              Modularity: "Fully Modular",
              FanSize: "135mm",
              Warranty: "10 Years",
            },
          },
          {
            id: "psu-2",
            type: "psu",
            name: "EVGA SuperNOVA 1000 G6 1000W 80+ Gold",
            price: 179.99,
            image: "/images/products/psu-1.jpg",
            wattage: 1000,
            specs: {
              Wattage: "1000W",
              Efficiency: "80+ Gold",
              Modularity: "Fully Modular",
              FanSize: "135mm",
              Warranty: "10 Years",
            },
          },
          {
            id: "psu-3",
            type: "psu",
            name: "be quiet! Dark Power 12 1200W 80+ Titanium",
            price: 349.99,
            image: "/images/products/psu-1.jpg",
            wattage: 1200,
            specs: {
              Wattage: "1200W",
              Efficiency: "80+ Titanium",
              Modularity: "Fully Modular",
              FanSize: "135mm",
              Warranty: "10 Years",
            },
          },
        ];
      case "cooler":
        return [
          {
            id: "cooler-1",
            type: "cooler",
            name: "NZXT Kraken X73 RGB 360mm AIO",
            price: 199.99,
            image: "/images/products/cooler-1.jpg",
            wattage: 5,
            specs: {
              Type: "Liquid",
              RadiatorSize: "360mm",
              FanSize: "3x 120mm",
              RGB: "Yes",
              Socket: "Intel LGA 1700, 1200, 115X, AMD AM5, AM4",
            },
          },
          {
            id: "cooler-2",
            type: "cooler",
            name: "Noctua NH-D15 chromax.black",
            price: 109.99,
            image: "/images/products/cooler-1.jpg",
            wattage: 3,
            specs: {
              Type: "Air",
              Height: "165mm",
              FanSize: "2x 140mm",
              RGB: "No",
              Socket: "Intel LGA 1700, 1200, 115X, AMD AM5, AM4",
            },
          },
          {
            id: "cooler-3",
            type: "cooler",
            name: "Corsair iCUE H150i ELITE CAPELLIX 360mm",
            price: 189.99,
            image: "/images/products/cooler-1.jpg",
            wattage: 5,
            specs: {
              Type: "Liquid",
              RadiatorSize: "360mm",
              FanSize: "3x 120mm",
              RGB: "Yes",
              Socket: "Intel LGA 1700, 1200, 115X, AMD AM5, AM4",
            },
          },
        ];
      case "fans":
        return [
          {
            id: "fan-1",
            type: "fans",
            name: "Corsair LL120 RGB 120mm (3-Pack)",
            price: 89.99,
            image: "/images/products/cooler-1.jpg",
            wattage: 6,
            specs: {
              Size: "120mm",
              Count: "3",
              RPM: "600-1500",
              Airflow: "43.25 CFM",
              RGB: "Yes",
            },
          },
          {
            id: "fan-2",
            type: "fans",
            name: "Noctua NF-A12x25 PWM 120mm (2-Pack)",
            price: 59.99,
            image: "/images/products/cooler-1.jpg",
            wattage: 3,
            specs: {
              Size: "120mm",
              Count: "2",
              RPM: "450-2000",
              Airflow: "60.09 CFM",
              RGB: "No",
            },
          },
          {
            id: "fan-3",
            type: "fans",
            name: "Lian Li UNI FAN SL120 RGB 120mm (3-Pack)",
            price: 79.99,
            image: "/images/products/cooler-1.jpg",
            wattage: 5,
            specs: {
              Size: "120mm",
              Count: "3",
              RPM: "800-1900",
              Airflow: "58.54 CFM",
              RGB: "Yes",
            },
          },
        ];
      default:
        return [];
    }
  };

  if (!componentType) return null;

  const components = getComponentsByType(componentType.id);

  const filteredComponents = components.filter((component) => {
    // Filter by search query
    if (
      searchQuery &&
      !component.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by selected filters
    for (const [filterKey, filterValues] of Object.entries(selectedFilters)) {
      if (
        filterValues.length > 0 &&
        !filterValues.includes(component.specs[filterKey])
      ) {
        return false;
      }
    }

    return true;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Get unique filter options for each spec
  const getFilterOptions = () => {
    const filterOptions: Record<string, string[]> = {};

    components.forEach((component) => {
      Object.entries(component.specs).forEach(([key, value]) => {
        if (!filterOptions[key]) {
          filterOptions[key] = [];
        }
        if (!filterOptions[key].includes(value)) {
          filterOptions[key].push(value);
        }
      });
    });

    return filterOptions;
  };

  const filterOptions = getFilterOptions();

  const handleFilterChange = (filterKey: string, filterValue: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[filterKey]) {
        newFilters[filterKey] = [];
      }

      if (newFilters[filterKey].includes(filterValue)) {
        newFilters[filterKey] = newFilters[filterKey].filter(
          (value) => value !== filterValue
        );
      } else {
        newFilters[filterKey].push(filterValue);
      }

      if (newFilters[filterKey].length === 0) {
        delete newFilters[filterKey];
      }

      return newFilters;
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-md p-0 sm:max-w-xl">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="flex items-center gap-2">
            <span className="text-xl">{componentType.icon}</span>
            Select {componentType.name}
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-[calc(100vh-5rem)] flex-col">
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={`Search ${componentType.name.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "h-10 w-10",
                  Object.keys(selectedFilters).length > 0 &&
                    "border-primary text-primary"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="space-y-4">
                  {Object.entries(filterOptions).map(([filterKey, values]) => (
                    <div key={filterKey}>
                      <h3 className="mb-2 text-sm font-medium">{filterKey}</h3>
                      <div className="flex flex-wrap gap-2">
                        {values.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleFilterChange(filterKey, value)}
                            className={cn(
                              "rounded-full border px-3 py-1 text-xs",
                              selectedFilters[filterKey]?.includes(value)
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-muted-foreground/20 bg-muted/50 text-muted-foreground hover:border-muted-foreground/50"
                            )}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {Object.keys(selectedFilters).length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFilters({})}
                      className="mt-2"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex-1 overflow-auto p-4">
            {filteredComponents.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="rounded-full bg-muted p-6">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No components found</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking
                  for.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredComponents.map((component) => (
                  <button
                    key={component.id}
                    className="flex items-start gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50"
                    onClick={() => onSelectComponent(component)}
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={component.image}
                        alt={component.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{component.name}</h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {Object.entries(component.specs)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <span
                              key={key}
                              className="rounded-full bg-muted px-2 py-0.5 text-xs"
                            >
                              {key}: {value}
                            </span>
                          ))}
                        {Object.keys(component.specs).length > 3 && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                            +{Object.keys(component.specs).length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium">
                          {formatPrice(component.price)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {component.wattage}W
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
