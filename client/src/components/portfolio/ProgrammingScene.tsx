import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { heroAnimation, shouldAutoplayHeroAnimation } from "@/lib/homeInteractions";

export function ProgrammingScene() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: shouldAutoplayHeroAnimation(query.matches),
      path: heroAnimation.assetUrl,
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
    });
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (shouldAutoplayHeroAnimation(event.matches)) animation.play();
      else {
        animation.pause();
        animation.goToAndStop(0, true);
      }
    };
    query.addEventListener("change", onMotionChange);
    return () => {
      query.removeEventListener("change", onMotionChange);
      animation.destroy();
    };
  }, []);

  return (
    <aside className="relative mx-auto w-full max-w-[520px]" aria-label={heroAnimation.ariaLabel}>
      <div className="grid min-h-[240px] place-items-center sm:min-h-[360px] lg:min-h-[420px]">
        <div ref={container} className="lottie-nightfall w-[118%] max-w-[530px]" role="img" aria-label={heroAnimation.ariaLabel} />
      </div>
    </aside>
  );
}
