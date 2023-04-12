import {Role} from '@prisma/client';
import type {User} from '@next-auth';
import 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    email: string;
    name: string;
    surname: string;
    role: Role;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
      role: Role;
    }
  }
}
