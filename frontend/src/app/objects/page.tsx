"use client";

import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract";

import React from "react";

export function TotalObjects() {
  const { data, isLoading, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "TotalObjects",
  });

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Error loading total objects</div>;

  return <div>Total Objects: {data?.toString()}</div>;
}

const page = () => {
  return (
    <div>
      <TotalObjects />
    </div>
  );
};

export default page;
