import z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAX_IMAGE_SIZE = 5; // Megabytes

function sizeInMB(sizeInBytes: number, decimals = 2): number {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimals);
}

export const academicYearSchema = z.object({
  year: z.string(),
  start_at: z.date(),
  end_at: z.date(),
  status: z
    .enum(["upcoming", "open", "ongoing", "finished"])
    .default("upcoming"),
});

export const enrollmentSchema = z.object({
  year: z.string(),
  level: z.string(),
  tuition_plan: z.string(),
  // student_id: z.number(),
  payment_receipt: z
    .instanceof(File, { message: "Image is required." })
    .refine(
      (f) => sizeInMB(f.size) <= MAX_IMAGE_SIZE,
      `The maximum file size is ${MAX_IMAGE_SIZE} MB.`,
    )
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, `Only .jpg, .jpeg, .png, .webp, and .avif files are accepted.`),
});
