import z from "zod";

export const academicYearSchema = z.object({
  year: z.string(),
  start_at: z.date(),
  end_at: z.date(),
  status: z
    .enum(["upcoming", "open", "ongoing", "finished"])
    .default("upcoming"),
});
