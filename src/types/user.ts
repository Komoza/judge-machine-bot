export type TUser = {
  id: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  is_bot?: boolean;
  language_code?: string | null;
  is_premium?: boolean;
};