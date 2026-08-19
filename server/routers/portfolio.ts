import { z } from "zod";
import {
    getAllBlogPosts,
    getAllProjects,
    getAllSkills,
    getBlogPostBySlug,
    getHomePortfolioData,
    getProjectBySlug,
} from "../portfolio";
import { publicProcedure, router } from "../_core/trpc";

const slugInputSchema = z.object({
    slug: z.string().trim().min(1, "A slug is required."),
});

export const portfolioRouter = router({
    home: publicProcedure.query(() => getHomePortfolioData()),
    projects: publicProcedure.query(() => getAllProjects()),
    projectBySlug: publicProcedure.input(slugInputSchema).query(({ input }) => getProjectBySlug(input.slug)),
    skills: publicProcedure.query(() => getAllSkills()),
    blogPosts: publicProcedure.query(() => getAllBlogPosts()),
    blogPostBySlug: publicProcedure.input(slugInputSchema).query(({ input }) => getBlogPostBySlug(input.slug)),
});