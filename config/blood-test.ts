import type { BloodTestQuestion } from "@/types/blood-test";

export const BLOOD_TEST_QUESTIONS: readonly BloodTestQuestion[] = [
  {
    id: "war",
    index: 1,
    title: "War Question",
    prompt:
      "When the Estate goes to war and the flip is live, do you charge the front line first or wait for the smoke to clear before you move?",
  },
  {
    id: "philosophy",
    index: 2,
    title: "Philosophy Question",
    prompt:
      "Is power something you take by force, or something you grow by staying silent until the moment is perfect?",
  },
  {
    id: "society",
    index: 3,
    title: "Society Question",
    prompt:
      "In the streets of the Estate, do you believe the strong protect the weak, or does every man live or die by his own holster?",
  },
];
