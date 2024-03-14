import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret:any=process.env.JWT_SECRET;

export function setUser(user: any) {
  return jwt.sign(
    {
      _id: user._id,
      _email: user.email,
    },
    secret
  );
}

export function getUser(token: string) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}
