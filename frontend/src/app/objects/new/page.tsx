"use client";
import React from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/contract";

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const email = formData.get("email") as string;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "createObject",
      args: [name, description, email],
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="description" placeholder="Description" required />
        <input name="email" placeholder="Email" required />
        <button type="submit" disabled={isPending || isConfirming}>
          {isPending || isConfirming ? "Processing..." : "Create Object"}
        </button>
      </form>
      {txHash && <p>Transaction Hash: {txHash}</p>}
      {isSuccess && <p>✅ Object created successfully!</p>}
      {isError && <p>❌ Error submitting transaction</p>}
    </div>
  );
}

const page = () => {
  return (
    <div>
      <CreateObjectForm />
    </div>
  );
};

export default page;
