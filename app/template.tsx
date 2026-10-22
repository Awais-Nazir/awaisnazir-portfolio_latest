import type { ReactNode } from "react";

// Content is immediately available; keep scrolling and route navigation native.
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
