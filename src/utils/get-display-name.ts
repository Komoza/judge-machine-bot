import {TUser} from "../types/user";
import {User} from "typegram";

export const getDisplayName = (user: TUser | User) => {
  return user.username
    ? `@${user.username}`
    : `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`;
}