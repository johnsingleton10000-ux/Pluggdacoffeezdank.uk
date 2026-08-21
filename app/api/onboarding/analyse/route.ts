import { NextResponse } from "next/server";
import { BLOOD_QUESTIONS, evaluateBloodTest, type BloodAnswer } from "@/lib/domains/blood-test";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const estateName = String(body?.estateName || "").trim();
  if (estateName.length < 2) {
    return NextResponse.json({ error: "Lock an Estate Name before the wax seal drops." }, { status: 400 });
  }
  const incoming = Array.isArray(body?.answers) ? (body.answers as BloodAnswer[]) : [];
  const answers = BLOOD_QUESTIONS.map((question) => {
    const found = incoming.find((item) => item.questionId === question.id);
    return { questionId: question.id, text: String(found?.text || "").trim() };
  });
  if (answers.some((answer) => answer.text.length < 4)) {
    return NextResponse.json({ error: "Answer all three questions in Estate language." }, { status: 400 });
  }
  const result = evaluateBloodTest(answers);
  return NextResponse.json({ estateName, result });
}
