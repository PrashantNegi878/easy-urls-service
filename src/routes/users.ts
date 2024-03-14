import { Express, Router } from "express";
import { handleUserSignup,handleUserLogin } from "../controllers/users";

export const router = Router();

router.post('/signup',handleUserSignup);

router.post('/login',handleUserLogin);