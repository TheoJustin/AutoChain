"use client"

import { useReadContract } from "wagmi"
import { CONTACT_OBJECTS_ADDRESS, CONTACT_OBJECTS_ABI } from "@/contracts/ContactObjects"

export default function DebugContact() {
  const { data: totalMessages, error: totalError } = useReadContract({
    address: CONTACT_OBJECTS_ADDRESS,
    abi: CONTACT_OBJECTS_ABI,
    functionName: "totalContactMessageObjects",
  })

  const { data: messages, error: messagesError } = useReadContract({
    address: CONTACT_OBJECTS_ADDRESS,
    abi: CONTACT_OBJECTS_ABI,
    functionName: "getAllContactMessages",
  })

  return (
    <div className="p-8">
      <h1>Debug Contact Contract</h1>
      <div className="mt-4">
        <h2>Contract Address: {CONTACT_OBJECTS_ADDRESS}</h2>
        <h3>Total Messages:</h3>
        <p>Data: {totalMessages?.toString()}</p>
        <p>Error: {totalError?.message}</p>
        
        <h3>All Messages:</h3>
        <p>Data: {JSON.stringify(messages, null, 2)}</p>
        <p>Error: {messagesError?.message}</p>
      </div>
    </div>
  )
}