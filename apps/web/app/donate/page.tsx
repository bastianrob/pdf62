"use client"

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons"
import { useState } from "react"

// Define the supported crypto networks and placeholder addresses.
// You can later inject these via environment variables or replace them here directly.
const CRYPTO_DONATIONS = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Network",
    address: process.env.NEXT_PUBLIC_DONATE_BTC || "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    color: "bg-[#F7931A]",
  },
  {
    id: "bnb",
    name: "Binance Coin",
    symbol: "BNB",
    network: "BEP20 (BSC)",
    address: process.env.NEXT_PUBLIC_DONATE_BNB || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    color: "bg-[#F3BA2F] text-slate-12",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    network: "ERC20",
    address: process.env.NEXT_PUBLIC_DONATE_ETH || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    color: "bg-[#627EEA]",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    network: "ERC20 / TRC20",
    address: process.env.NEXT_PUBLIC_DONATE_USDT || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    color: "bg-[#26A17B]",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    network: "ERC20 / SPL",
    address: process.env.NEXT_PUBLIC_DONATE_USDC || "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    color: "bg-[#2775CA]",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    network: "Solana Network",
    address: process.env.NEXT_PUBLIC_DONATE_SOL || "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
    color: "bg-[#14F195] text-slate-12",
  },
]

export default function DonatePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-1 p-8">
      <div className="max-w-6xl mx-auto text-center mb-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-12 mb-4 tracking-tight">Support Our Work</h1>
        <p className="text-lg text-slate-11 leading-relaxed">
          PDF62 is maintained by independent software engineers. If our free tools have saved you time, consider making a donation. Your support goes directly toward paying server costs and developing new features.
        </p>
      </div>

      <div className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="bg-slate-2 border border-slate-6 rounded-3xl p-4 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-12 mb-6 text-center">Donate via Cryptocurrency</h2>

          <div className="space-y-4">
            {CRYPTO_DONATIONS.map((crypto) => (
              <div key={crypto.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-1 border border-slate-6 rounded-2xl gap-4 hover:border-slate-7 transition-colors">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${crypto.color}`}>
                    {crypto.symbol}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-12">{crypto.name}</h3>
                    <p className="text-xs text-slate-10 font-mono mt-0.5">{crypto.network}</p>
                  </div>
                </div>

                <div className="w-full md:w-auto flex items-center gap-2 bg-slate-3 p-2 rounded-xl border border-slate-6">
                  <div className="font-mono text-xs text-slate-11 overflow-hidden text-ellipsis whitespace-nowrap px-2">
                    {crypto.address}
                  </div>
                  <button
                    onClick={() => copyToClipboard(crypto.id, crypto.address)}
                    className="shrink-0 p-2 rounded-lg bg-slate-4 hover:bg-slate-5 text-slate-12 transition-colors focus:outline-none focus:ring-2 focus:ring-red-9"
                    title="Copy address"
                  >
                    {copiedId === crypto.id ? (
                      <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-6 text-center text-sm text-slate-10">
            <p>Please verify the network before sending. Sending crypto on the wrong network may result in permanent loss of funds.</p>
            <p className="mt-2 text-slate-11 font-semibold">Thank you for your generosity! ❤️</p>
          </div>
        </div>
      </div>
    </div>
  )
}
