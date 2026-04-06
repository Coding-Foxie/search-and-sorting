// app/lib/validations/snippet.ts
import { z } from "zod";

export const SUPPORTED_LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "sql",
] as const;

export const snippetSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long"),
  code: z.string().min(1, "Code content is required"),
  language: z.enum(SUPPORTED_LANGUAGES, {
    invalid_type_error: "Please select a supported language",
  }),
  isPublic: z.boolean().default(false),
});

// This magic line extracts the TypeScript type from the Zod schema!
export type SnippetInput = z.infer<typeof snippetSchema>;
