import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { SiteFrame } from "@/components/portfolio/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <div className="container min-h-[60vh] flex flex-col items-center justify-center py-20 text-center">
        <div className="surface-card max-w-md p-8 sm:p-10">
          <div className="mx-auto grid size-12 place-items-center rounded-full border border-red-400/30 bg-red-400/10 text-red-400">
            <AlertCircle size={24} />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[#f0c276]">404 error</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#f6f1e9]">Page not found</h1>
          <p className="mt-3 text-sm leading-6 text-[#f6f1e9]/60">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/" className="button-primary">
              <ArrowLeft size={16} /> Back to home
            </Link>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
