declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user_id: string;
    user_email: string;
    user_isAdmin: boolean;
  }
}
