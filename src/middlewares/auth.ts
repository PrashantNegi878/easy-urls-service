import { NextFunction, Request, Response } from "express";
import { MISSING_UID, VALIDATE_USER_FAILED } from "../constants";
import { getUser, setUser } from "../service/auth";

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

const applyAuthTo=['/analytics','/adminAnalytics'];

async function validateUser(req: Request, res: Response, next: NextFunction) {   
  if (req.method === 'GET' && !(applyAuthTo.includes(req.path))) return next(); 
  const fullToken = req.headers.authorization;
  if (!fullToken) return res.status(400).json({ message: MISSING_UID });
  const token = fullToken?.split(" ")[1];
  const user = getUser(token);
  if (!user) return res.status(400).json({ message: VALIDATE_USER_FAILED });
  req.user = user;
  next();
}

export default validateUser;
