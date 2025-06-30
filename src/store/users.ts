import fs from 'fs';
import path from 'path';
import {TUser} from "../types/user";



const filePath = path.resolve(__dirname, '../../data/users.json');

export function loadUsers(): TUser[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveUsers(users: TUser[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

export function addUser(user: TUser): boolean {
  const users = loadUsers();
  if (users.some((u) => u.id === user.id)) return false;

  users.push(user);
  saveUsers(users);
  return true;
}