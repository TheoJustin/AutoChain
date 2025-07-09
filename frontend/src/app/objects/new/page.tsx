"use client";
import React, { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/contract";
import dynamic from "next/dynamic";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  DollarSign,
  FileText,
  Loader2,
  Mail,
  Package,
  Tag,
  XCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CreateObjectForm() {
  const {
    writeContract,
    data: txHash,
    isError,
    isPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const email = formData.get("email") as string;
    const startPrice = formData.get("startPrice") as string;
    const category = formData.get("category") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "createObject",
      args: [
        name,
        description,
        email,
        startPrice,
        category,
        Math.floor(new Date(startDate).getTime() / 1000),
        Math.floor(new Date(endDate).getTime() / 1000),
      ],
    });
  }

  const categories = [
    "Electronics",
    "Fashion & Accessories",
    "Home & Garden",
    "Sports & Recreation",
    "Books & Media",
    "Art & Collectibles",
    "Automotive",
    "Jewelry & Watches",
    "Toys & Games",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Auction
          </h1>
          <p className="text-gray-600">
            List your item for auction and reach potential buyers
          </p>
        </div>

        <Card className="shadow-lg mt-2 mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg py-6 px-12">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Package className="h-5 w-5 text-blue-600" />
              Auction Details
            </CardTitle>
            <CardDescription>
              Fill in the information below to create your auction listing
            </CardDescription>
          </CardHeader>
          <CardContent className="px-12 pb-10">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Tag className="h-4 w-4" />
                  Item Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter the name of your item"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of your item, including condition, features, and any relevant details..."
                  className="w-full min-h-[120px] resize-none"
                  required
                />
                <p className="text-xs text-gray-500">
                  A detailed description helps attract more bidders
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Mail className="h-4 w-4" />
                  Contact Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full"
                  required
                />
                <p className="text-xs text-gray-500">
                  This email will be used to contact you about the auction
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="startPrice"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <DollarSign className="h-4 w-4" />
                    Starting Price
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      id="startPrice"
                      name="startPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Package className="h-4 w-4" />
                    Category
                  </Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </Label>
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setStartDate(date);
                    }}
                    className="rounded-md border shadow-sm"
                  />
                  <input
                    type="hidden"
                    name="startDate"
                    value={startDate ? startDate.toISOString() : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="endDate"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Calendar className="h-4 w-4" />
                    End Date
                  </Label>
                  <CalendarComponent
                    mode="single"
                    captionLayout="dropdown"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                      setEndDateOpen(false);
                    }}
                    className="rounded-md border shadow-sm"
                  />
                  <input
                    type="hidden"
                    name="endDate"
                    value={endDate ? endDate.toISOString() : ""}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isPending || isConfirming}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 text-base disabled:opacity-50"
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isPending ? "Preparing..." : "Confirming..."}
                    </>
                  ) : (
                    "Create Auction"
                  )}
                </Button>
              </div>
            </form>

            {isPending && (
              <Alert className="mt-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>Preparing transaction...</AlertDescription>
              </Alert>
            )}

            {isConfirming && (
              <Alert className="mt-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>Waiting for confirmation...</AlertDescription>
              </Alert>
            )}

            {isSuccess && (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Auction created successfully!
                </AlertDescription>
              </Alert>
            )}

            {isError && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Failed to create auction. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8">
          <h3 className="font-medium text-blue-900 mb-2">Important Notes:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Make sure your item description is accurate and detailed</li>
            <li>• Set a reasonable starting price to attract bidders</li>
            <li>• Choose appropriate start and end dates for your auction</li>
            <li>
              • You will receive email notifications about bids and auction
              status
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const page = () => {
  return <CreateObjectForm />;
};

export default page;
