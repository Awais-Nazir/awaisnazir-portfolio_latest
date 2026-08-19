export const aboutTabs = [
  { id: "experience", label: "Experience", panelId: "experience-panel" },
  { id: "education", label: "Education", panelId: "education-panel" },
] as const;

export type AboutTabId = (typeof aboutTabs)[number]["id"];

export const defaultAboutTab: AboutTabId = "experience";
export const portraitObjectPosition = "66% center";

export function getAboutPanelState(activeTab: AboutTabId) {
  return aboutTabs.map((tab) => ({ ...tab, selected: tab.id === activeTab }));
}

export const heroAnimation = {
  ariaLabel: "Animated programming systems illustration",
  source: "supplied-lottie-json",
  assetUrl: "/images/programming-computer_b2b0e2cb.json",
} as const;

export function shouldAutoplayHeroAnimation(prefersReducedMotion: boolean) {
  return !prefersReducedMotion;
}
