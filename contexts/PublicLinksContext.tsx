"use client";
import { createContext, useContext } from "react";
import type { PublicLinks } from "@/lib/publicLinks";
export const PublicLinksContext = createContext<PublicLinks>({});
export const usePublicLinks = () => useContext(PublicLinksContext);
