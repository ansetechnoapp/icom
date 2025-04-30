"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/lib/cart";

const shippingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number is required"),
  cardName: z.string().min(2, "Name on card is required"),
  expiryDate: z.string().min(5, "Expiry date is required"),
  cvv: z.string().min(3, "CVV is required"),
  savePaymentInfo: z.boolean().optional(),
});

type CheckoutStep = "shipping" | "payment" | "confirmation";

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    shippingMethod: "standard",
    saveAddress: false,
    notes: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      shippingSchema.parse(shippingInfo);
      setCurrentStep("payment");
      window.scrollTo(0, 0);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      paymentSchema.parse(paymentInfo);

      // In a real application, this would call an API to process the payment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCurrentStep("confirmation");
      window.scrollTo(0, 0);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmOrder = () => {
    // In a real application, this would finalize the order
    clearCart();
    router.push("/checkout/success");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (currentStep === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
    } else if (currentStep === "payment") {
      setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (currentStep === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [name]: checked }));
    } else if (currentStep === "payment") {
      setPaymentInfo((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (currentStep === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    if (currentStep === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between border-b pb-4">
        <div
          className={`flex items-center gap-2 ${
            currentStep === "shipping" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === "shipping"
                ? "bg-primary text-primary-foreground"
                : currentStep === "payment" || currentStep === "confirmation"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="font-medium">Shipping</span>
        </div>
        <div className="h-0.5 flex-1 self-center bg-muted"></div>
        <div
          className={`flex items-center gap-2 ${
            currentStep === "payment" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === "payment"
                ? "bg-primary text-primary-foreground"
                : currentStep === "confirmation"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="font-medium">Payment</span>
        </div>
        <div className="h-0.5 flex-1 self-center bg-muted"></div>
        <div
          className={`flex items-center gap-2 ${
            currentStep === "confirmation" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === "confirmation"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            3
          </div>
          <span className="font-medium">Confirmation</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === "shipping" && (
          <motion.form
            key="shipping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleShippingSubmit}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <p className="text-sm text-muted-foreground">
                Enter your shipping details
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-xs text-destructive">{errors.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className={errors.state ? "border-destructive" : ""}
                />
                {errors.state && (
                  <p className="text-xs text-destructive">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? "border-destructive" : ""}
                />
                {errors.zipCode && (
                  <p className="text-xs text-destructive">{errors.zipCode}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={shippingInfo.country}
                  onValueChange={(value) => handleSelectChange("country", value)}
                >
                  <SelectTrigger
                    id="country"
                    className={errors.country ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-xs text-destructive">{errors.country}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Shipping Method</h3>
                <RadioGroup
                  value={shippingInfo.shippingMethod}
                  onValueChange={(value) =>
                    handleRadioChange("shippingMethod", value)
                  }
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-normal">
                        Standard Shipping (3-5 business days)
                      </Label>
                    </div>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-normal">
                        Express Shipping (1-2 business days)
                      </Label>
                    </div>
                    <span className="font-medium">$15.00</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <Label htmlFor="overnight" className="font-normal">
                        Overnight Shipping (Next business day)
                      </Label>
                    </div>
                    <span className="font-medium">$25.00</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Special instructions for delivery"
                  value={shippingInfo.notes}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveAddress"
                  checked={shippingInfo.saveAddress}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("saveAddress", checked as boolean)
                  }
                />
                <Label htmlFor="saveAddress" className="text-sm font-normal">
                  Save this address for future orders
                </Label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Continue to Payment
              </Button>
            </div>
          </motion.form>
        )}

        {currentStep === "payment" && (
          <motion.form
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handlePaymentSubmit}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">Payment Information</h2>
              <p className="text-sm text-muted-foreground">
                Enter your payment details
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                className={errors.cardNumber ? "border-destructive" : ""}
              />
              {errors.cardNumber && (
                <p className="text-xs text-destructive">{errors.cardNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={paymentInfo.cardName}
                onChange={handleInputChange}
                className={errors.cardName ? "border-destructive" : ""}
              />
              {errors.cardName && (
                <p className="text-xs text-destructive">{errors.cardName}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  className={errors.expiryDate ? "border-destructive" : ""}
                />
                {errors.expiryDate && (
                  <p className="text-xs text-destructive">{errors.expiryDate}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  className={errors.cvv ? "border-destructive" : ""}
                />
                {errors.cvv && (
                  <p className="text-xs text-destructive">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="savePaymentInfo"
                checked={paymentInfo.savePaymentInfo}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("savePaymentInfo", checked as boolean)
                }
              />
              <Label htmlFor="savePaymentInfo" className="text-sm font-normal">
                Save this payment method for future orders
              </Label>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep("shipping")}
              >
                Back to Shipping
              </Button>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Review Order"}
              </Button>
            </div>
          </motion.form>
        )}

        {currentStep === "confirmation" && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">Review Your Order</h2>
              <p className="text-sm text-muted-foreground">
                Please review your order details before confirming
              </p>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <div>
                <h3 className="font-medium">Shipping Information</h3>
                <div className="mt-2 text-sm">
                  <p>
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </p>
                  <p>{shippingInfo.address}</p>
                  <p>
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                  </p>
                  <p>{shippingInfo.country}</p>
                  <p>{shippingInfo.email}</p>
                  <p>{shippingInfo.phone}</p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-medium">Shipping Method</h3>
                <p className="mt-2 text-sm">
                  {shippingInfo.shippingMethod === "standard"
                    ? "Standard Shipping (3-5 business days)"
                    : shippingInfo.shippingMethod === "express"
                    ? "Express Shipping (1-2 business days)"
                    : "Overnight Shipping (Next business day)"}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-medium">Payment Method</h3>
                <p className="mt-2 text-sm">
                  Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep("payment")}
              >
                Back to Payment
              </Button>
              <Button size="lg" onClick={handleConfirmOrder}>
                Confirm Order
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
