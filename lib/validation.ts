// app/lib/validations/snippet.ts
import { z } from "zod";

const languages = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "sql",
] as const;

export const LanguageEnum = z.enum(languages);

export const snippetSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long"),
  code: z.string().min(1, "Code content is required"),
  language: LanguageEnum,
  isPublic: z.boolean().default(false),
});

export type SnippetInput = z.infer<typeof snippetSchema>;
