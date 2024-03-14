import express from "express";
import { generateShortURL,handleRedirect,handleAnalytics,handleAllAnalytics } from "../controllers/url";
export const router = express.Router();

router.post('/',generateShortURL);

router.get('/analytics',handleAnalytics);

router.get('/adminAnalytics',handleAllAnalytics);

router.get('/:shortId',handleRedirect);