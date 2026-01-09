"use client"

import { useEffect, useState } from "react"

export default function TestPage() {
  const [results, setResults] = useState<Record<string, { success: boolean; status?: number; error?: string }> | null>(
    null,
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((e) => {
        setResults({ error: { success: false, error: String(e) } })
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connectivity Test</h1>
      {loading ? (
        <p>Testing APIs...</p>
      ) : (
        <pre className="bg-muted p-4 rounded-lg overflow-auto">{JSON.stringify(results, null, 2)}</pre>
      )}
    </div>
  )
}
