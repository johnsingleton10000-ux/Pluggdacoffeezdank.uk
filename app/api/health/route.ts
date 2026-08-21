export async function GET() {
  return Response.json({ ok: true, service: "dcbd", time: new Date().toISOString() });
}
