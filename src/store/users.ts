import fs from 'fs';
import path from 'path';

export type StoredUser = {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  is_bot: boolean;
};

const filePath = path.resolve(__dirname, '../data/users.json');

export function loadUsers(): StoredUser[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveUsers(users: StoredUser[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

export function addUser(user: StoredUser): boolean {
  const users = loadUsers();
  if (users.some((u) => u.id === user.id)) return false;

  users.push(user);
  saveUsers(users);
  return true;
}