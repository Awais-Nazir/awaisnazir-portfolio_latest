import { SiteFrame } from "@/components/portfolio/SiteFrame";

export default function Loading() {
  return <SiteFrame><main className="editorial-container py-12" aria-busy="true"><p role="status" className="editorial-label">Loading content…</p><div aria-hidden="true" className="mt-8 space-y-6"><div className="h-12 max-w-lg rounded bg-white/10" /><div className="h-5 max-w-2xl rounded bg-white/5" /><div className="mt-12 h-64 rounded bg-white/5" /></div></main></SiteFrame>;
}
