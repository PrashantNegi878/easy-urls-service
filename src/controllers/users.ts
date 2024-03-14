import { Request, Response } from "express";
import {
  FAILED_FETCH_USER,
  FETCHD_USER_DATA,
  INVALID_USER_DATA,
  USER_ALREADY_EXISTS,
  USER_CREATED_MESSAGE,
  USER_NOT_CREATED_MESSAGE,
} from "../constants";
import User from "../models/users";
import { setUser } from "../service/auth";
import { v4 as uuidv4 } from 'uuid';

export async function handleUserSignup(req: Request, res: Response) {
  const { name, email, password } = req.body as any;
  try {
    let user=await User.findOne({  email });
    if(user) return res.status(400).json({ message: USER_ALREADY_EXISTS });
    user=await User.create({ name, email, password });
    const token=setUser(user); 
    return res.status(201).json({ message: USER_CREATED_MESSAGE,userName:user.name,token });
  } catch (err) {
    return res.status(500).json({ message: USER_NOT_CREATED_MESSAGE });
  }
}

export async function handleUserLogin(req: Request, res: Response) {
  const { email, password } = req.body as any;
  try {
    const user = await User.findOne({ email, password });  
    if (!user) return res.status(400).json({ message: INVALID_USER_DATA });   
    const token=setUser(user);   
    return res.status(200).json({ message: FETCHD_USER_DATA,userName:user.name,token:token });
  } catch (err) {
    return res.status(500).json({ message: FAILED_FETCH_USER });
  }
}
