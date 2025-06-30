import fs from 'fs';
import path from 'path';
import {TQuestion} from "../types/question";

const filePath = path.resolve(__dirname, '../../data/questions.json');

export function loadQuestions(): TQuestion[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveQuestion(entry: TQuestion) {
  const all = loadQuestions();
  all.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(all, null, 2), 'utf-8');
}