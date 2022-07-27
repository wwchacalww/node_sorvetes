import { sign } from "jsonwebtoken";

type UserJWTInput = {
  id: string;
  email: string;
  isAdmin: boolean;
  permissions: string[];
  roles: string[];
};

export function createJWToken({
  id,
  email,
  isAdmin,
  permissions,
  roles,
}: UserJWTInput): string {
  return sign(
    {
      id,
      email,
      isAdmin,
      permissions,
      roles,
    },
    process.env.JWT_SECRET,
    {
      subject: email,
      expiresIn: 3600 * 4, // 4 hours
    }
  );
}
