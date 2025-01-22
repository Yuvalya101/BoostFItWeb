import z from "zod";

export const ContentValidationScheme = z.object({
  content: z.string().min(1, "Content is required"),
});
export const ImageValidationScheme = z.object({
  image: z.string().optional(),
});

export const PostCreationValidationScheme = ContentValidationScheme.merge(ImageValidationScheme);
export const PostUpdateValidationScheme = z.union([
  ContentValidationScheme,
  ImageValidationScheme,
  PostCreationValidationScheme,
]);

export const CommentCreationValidationScheme = z.object({
  content: z.string().min(1, "Content is required"),
});

export type CommentCreation = z.infer<typeof CommentCreationValidationScheme>;
export type PostCreation = z.infer<typeof PostCreationValidationScheme>;
export type PostUpdate = z.infer<typeof PostUpdateValidationScheme>;
