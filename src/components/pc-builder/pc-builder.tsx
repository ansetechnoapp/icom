"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, X, AlertTriangle, Check, Share2, Save, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ComponentSelector } from "@/components/pc-builder/component-selector";
import { cn } from "@/lib/utils";

interface Component {
  id: string;
  type: string;
  name: string;
  price: number;
  image: string;
  wattage: number;
  inStock: boolean;  // Added stock status
}

interface ComponentType {
  id: string;
  name: string;
  icon: string;
  required: boolean;
}

export function PCBuilder() {
  const componentTypes: ComponentType[] = [
    { id: "cpu", name: "Processor", icon: "🧠", required: true },
    { id: "motherboard", name: "Motherboard", icon: "🔌", required: true },
    { id: "memory", name: "Memory", icon: "🧩", required: true },
    { id: "storage", name: "Storage", icon: "💾", required: true },
    { id: "gpu", name: "Graphics Card", icon: "📺", required: false },
    { id: "case", name: "Case", icon: "🏠", required: true },
    { id: "psu", name: "Power Supply", icon: "⚡", required: true },
    { id: "cooler", name: "CPU Cooler", icon: "❄️", required: true },
    { id: "fans", name: "Case Fans", icon: "🌀", required: false },
  ];

  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component | null>>({
    cpu: null,
    motherboard: null,
    memory: null,
    storage: null,
    gpu: null,
    case: null,
    psu: null,
    cooler: null,
    fans: null,
  });

  const [isComponentSelectorOpen, setIsComponentSelectorOpen] = useState(false);
  const [currentComponentType, setCurrentComponentType] = useState<ComponentType | null>(null);

  const handleOpenComponentSelector = (componentType: ComponentType) => {
    setCurrentComponentType(componentType);
    setIsComponentSelectorOpen(true);
  };

  const handleSelectComponent = (component: Component) => {
    if (!currentComponentType) return;

    setSelectedComponents((prev) => ({
      ...prev,
      [currentComponentType.id]: component,
    }));
    setIsComponentSelectorOpen(false);
  };

  const handleRemoveComponent = (componentTypeId: string) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [componentTypeId]: null,
    }));
  };

  const calculateTotalPrice = () => {
    return Object.values(selectedComponents).reduce(
      (total, component) => total + (component?.price || 0),
      0
    );
  };

  const calculateTotalWattage = () => {
    return Object.values(selectedComponents).reduce(
      (total, component) => total + (component?.wattage || 0),
      0
    );
  };

  const getSelectedComponentsCount = () => {
    return Object.values(selectedComponents).filter(Boolean).length;
  };

  const getRequiredComponentsCount = () => {
    return componentTypes.filter((type) => type.required).length;
  };

  const isConfigurationComplete = () => {
    return componentTypes
      .filter((type) => type.required)
      .every((type) => selectedComponents[type.id]);
  };

  const isPowerSupplySufficient = () => {
    const totalWattage = calculateTotalWattage();
    const psu = selectedComponents.psu;
    if (!psu) return true; // No PSU selected yet
    return psu.wattage >= totalWattage * 1.2; // 20% headroom
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
      <div className="space-y-6">
        <div className="rounded-lg border">
          <div className="border-b bg-muted/50 p-4">
            <h2 className="text-lg font-medium">Select Components</h2>
            <p className="text-sm text-muted-foreground">
              Choose compatible components for your custom PC build
            </p>
          </div>
          <div className="divide-y">
            {componentTypes.map((componentType) => {
              const component = selectedComponents[componentType.id];
              return (
                <div
                  key={componentType.id}
                  className={cn(
                    "flex items-center gap-4 p-4",
                    componentType.required && "bg-muted/20"
                  )}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl">
                    {componentType.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{componentType.name}</h3>
                      {componentType.required && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                          Required
                        </span>
                      )}
                    </div>
                    {component ? (
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative h-8 w-8 overflow-hidden rounded-md bg-muted">
                            <Image
                              src={component.image}
                              alt={component.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm">{component.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {formatPrice(component.price)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveComponent(componentType.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">
                        No {componentType.name.toLowerCase()} selected
                      </p>
                    )}
                  </div>
                  <Button
                    variant={component ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleOpenComponentSelector(componentType)}
                  >
                    {component ? "Change" : <Plus className="mr-1 h-4 w-4" />}
                    {component ? "" : "Add"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <ComponentSelector
          isOpen={isComponentSelectorOpen}
          onClose={() => setIsComponentSelectorOpen(false)}
          componentType={currentComponentType}
          onSelectComponent={handleSelectComponent}
        />
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-medium">Build Summary</h2>

          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Components Selected
                </span>
                <span className="font-medium">
                  {getSelectedComponentsCount()} / {componentTypes.length}
                </span>
              </div>
              <Progress
                value={(getSelectedComponentsCount() / componentTypes.length) * 100}
                className="h-2"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Required Components
                </span>
                <span className="font-medium">
                  {
                    componentTypes
                      .filter((type) => type.required && selectedComponents[type.id])
                      .length
                  }{" "}
                  / {getRequiredComponentsCount()}
                </span>
              </div>
              <Progress
                value={
                  (componentTypes.filter(
                    (type) => type.required && selectedComponents[type.id]
                  ).length /
                    getRequiredComponentsCount()) *
                  100
                }
                className="h-2"
              />
            </div>

            {selectedComponents.psu && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Power Usage
                    </span>
                    {!isPowerSupplySufficient() && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              Your power supply may not be sufficient for this build.
                              We recommend at least 20% headroom above your total
                              power usage.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <span className="font-medium">
                    {calculateTotalWattage()} W /{" "}
                    {selectedComponents.psu?.wattage} W
                  </span>
                </div>
                <Progress
                  value={
                    (calculateTotalWattage() / selectedComponents.psu.wattage) * 100
                  }
                  className={cn(
                    "h-2",
                    !isPowerSupplySufficient() && "bg-amber-500"
                  )}
                />
              </div>
            )}

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Estimated Total</span>
                <span className="text-xl font-bold">
                  {formatPrice(calculateTotalPrice())}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Prices are subject to change and exclude shipping costs
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                disabled={getSelectedComponentsCount() === 0}
              >
                <Save className="h-4 w-4" />
                Save Build
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                disabled={getSelectedComponentsCount() === 0}
              >
                <Share2 className="h-4 w-4" />
                Share Build
              </Button>
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!isConfigurationComplete()}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </Button>

            {!isConfigurationComplete() && (
              <p className="text-center text-xs text-muted-foreground">
                Please select all required components to continue
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-medium">Compatibility Check</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                  isConfigurationComplete()
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isConfigurationComplete() ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">1</span>
                )}
              </div>
              <div>
                <p className="font-medium">Required Components</p>
                <p className="text-sm text-muted-foreground">
                  {isConfigurationComplete()
                    ? "All required components selected"
                    : "Select all required components"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                  selectedComponents.psu && isPowerSupplySufficient()
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {selectedComponents.psu && isPowerSupplySufficient() ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">2</span>
                )}
              </div>
              <div>
                <p className="font-medium">Power Supply</p>
                <p className="text-sm text-muted-foreground">
                  {!selectedComponents.psu
                    ? "Select a power supply"
                    : isPowerSupplySufficient()
                    ? "Power supply is sufficient"
                    : "Power supply may not be sufficient"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                  selectedComponents.cpu &&
                    selectedComponents.motherboard
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {selectedComponents.cpu && selectedComponents.motherboard ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">3</span>
                )}
              </div>
              <div>
                <p className="font-medium">CPU & Motherboard</p>
                <p className="text-sm text-muted-foreground">
                  {!selectedComponents.cpu || !selectedComponents.motherboard
                    ? "Select both CPU and motherboard"
                    : "CPU and motherboard are compatible"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// In the component display section
{component ? (
  <div className="mt-1 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8 overflow-hidden rounded-md bg-muted">
        <Image
          src={component.image}
          alt={component.name}
          fill
          className="object-cover"
        />
      </div>
      <span className="text-sm">{component.name}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-medium">
        {formatPrice(component.price)}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={() => handleRemoveComponent(componentType.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <p className="mt-1 text-sm text-muted-foreground">
      No {componentType.name.toLowerCase()} selected
    </p>
  )}
  {!component.inStock && (
    <span className="flex items-center text-xs text-destructive">
      <AlertTriangle className="mr-1 h-3 w-3" />
      Out of Stock
    </span>
  )}
  </div>
) : null}
