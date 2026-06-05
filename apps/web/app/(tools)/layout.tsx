
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-grow bg-slate-1 relative">
        {children}
      </main>
    </div>
  )
}

