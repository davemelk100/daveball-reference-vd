import { AskPageContent } from "@/components/ask-page-content"

export const metadata = {
  title: "ChatMLB | Major League Numbers",
  description: "Ask questions about baseball statistics and history",
}

export const dynamic = "force-dynamic"

export default function AskPage() {
  return <AskPageContent />
}
