"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProGateProps {
  children: React.ReactNode
}

export function ProGate({ children }: ProGateProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user?.isPaidUser) {
      router.replace("/pricing")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-11 text-sm">Loading...</div>
      </div>
    )
  }

  if (!session?.user?.isPaidUser) return null

  return <>{children}</>
}
