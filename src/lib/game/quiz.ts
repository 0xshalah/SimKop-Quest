export interface QuizQuestion {
  id: string;
  q: string;
  opts: readonly string[];
  /** index jawaban benar. */
  answer: number;
}

/** Bank soal literasi koperasi untuk pre/post quiz. */
export const QUIZ: readonly QuizQuestion[] = [
  {
    id: "shu",
    q: "SHU koperasi adalah...",
    opts: ["Gaji pengurus", "Sisa laba usaha yang dibagi ke anggota", "Biaya operasional", "Dana cadangan"],
    answer: 1,
  },
  {
    id: "prinsip",
    q: "Prinsip koperasi yang membedakannya dari PT adalah...",
    opts: ["Profit maksimal", "Satu anggota satu suara", "Dimiliki investor terbesar", "Tanpa laporan keuangan"],
    answer: 1,
  },
  {
    id: "simkopdes",
    q: "SIMKOPDES adalah...",
    opts: ["Game mobile koperasi", "Platform digital Kemenkop untuk data koperasi desa", "Bank koperasi", "Pinjol"],
    answer: 1,
  },
];

const quizById = new Map(QUIZ.map((q) => [q.id, q]));

/** Hitung skor benar (0..QUIZ.length) dari peta jawaban {questionId: optionIndex}. */
export function scoreQuiz(answers: Record<string, number>): number {
  let correct = 0;
  for (const q of QUIZ) {
    if (answers[q.id] === q.answer) correct++;
  }
  return correct;
}

export function isValidQuizAnswers(answers: Record<string, number>): boolean {
  const keys = Object.keys(answers);
  if (keys.length !== QUIZ.length) return false;
  return QUIZ.every((q) => {
    const a = answers[q.id];
    return typeof a === "number" && Number.isInteger(a) && a >= 0 && a < q.opts.length;
  });
}
