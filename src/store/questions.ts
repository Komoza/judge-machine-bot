import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../data/questions.json');

export type StoredQuestion = {
  question: string;
  userId: number;
  timestamp: number;
};

export function loadQuestions(): StoredQuestion[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveQuestion(entry: StoredQuestion) {
  const all = loadQuestions();
  all.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(all, null, 2), 'utf-8');
}