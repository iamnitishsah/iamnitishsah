import { getStats } from "@/lib/stats";

// GET /api/stats — the same numbers the page uses, as JSON. Cached for an hour.
export const revalidate = 3600;

export async function GET() {
  return Response.json(await getStats());
}
