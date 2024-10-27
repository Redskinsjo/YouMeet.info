"use server";
import * as jose from "jose";

export const verif = async (token: string) => {
  const alg = "HS256";
  const secret = new TextEncoder().encode(`${process.env.JWT_SECRET}`);
  const result = await jose.jwtVerify(token, secret, { algorithms: [alg] });
  const payload = result.payload;
  return payload;
};

export const s = async (payload: {
  [key: string]: string | boolean | undefined | null;
}) => {
  const alg = "HS256";
  const secret = new TextEncoder().encode(`${process.env.JWT_SECRET}`);
  const result = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .sign(secret);
  return result;
};
