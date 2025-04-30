import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, Truck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed | iCome Hardware",
  description: "Your order has been confirmed and is being processed",
};

export default function CheckoutSuccessPage() {
  // In a real application, this would be fetched from the database
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const estimatedDelivery = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/20">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and is being
          processed.
        </p>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row">
          <div>
            <h2 className="text-lg font-medium">Order Information</h2>
            <p className="text-sm text-muted-foreground">
              Order details and tracking information
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">Order #{orderNumber}</p>
            <p className="text-sm text-muted-foreground">{orderDate}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border p-4 text-center">
            <Package className="mb-2 h-8 w-8 text-primary" />
            <h3 className="font-medium">Order Processing</h3>
            <p className="text-sm text-muted-foreground">
              Your order is being prepared for shipment
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-4 text-center">
            <Truck className="mb-2 h-8 w-8 text-primary" />
            <h3 className="font-medium">Shipping Method</h3>
            <p className="text-sm text-muted-foreground">
              Standard Shipping (3-5 business days)
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border p-4 text-center">
            <Calendar className="mb-2 h-8 w-8 text-primary" />
            <h3 className="font-medium">Estimated Delivery</h3>
            <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-medium">What's Next?</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              1
            </span>
            <span>
              You will receive an order confirmation email with details of your
              purchase.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              2
            </span>
            <span>
              Once your order ships, we'll send you a shipping confirmation email
              with tracking information.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              3
            </span>
            <span>
              You can track your order status at any time by visiting your account
              dashboard.
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="flex-1">
          <Link href="/dashboard/orders">View Order</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="flex-1">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
