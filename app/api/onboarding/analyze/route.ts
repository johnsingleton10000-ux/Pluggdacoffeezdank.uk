import { runOnboardingAi } from "@/services/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { estateName?: string; answers?: Record<string, string> };
    if (!body.estateName || body.estateName.trim().length < 2) {
      return Response.json({ error: "Lock an Estate name." }, { status: 400 });
    }
    const result = runOnboardingAi(body.answers ?? {}, body.estateName);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Analysis failed" }, { status: 400 });
  }
}
