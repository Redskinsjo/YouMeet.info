type LoginCookiePayload = {
  email: string;
  customerId?: string;
  unlimited?: boolean;
  returnTo: string;
  userId: string;
  pro: boolean;
  user: boolean;
  uniqueName?: string;
};

export default LoginCookiePayload;
