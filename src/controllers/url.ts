import { nanoid } from "nanoid";
import { URL } from "../models/url";
import { Request, Response } from "express";
import { ALREADY_EXISTS_ERROR, GENERIC_SERVER_ERROR, NOT_FOUND_ERROR } from "../constants";

export async function generateShortURL(req: Request, res: Response) {
  try {
    const body = req.body;
    console.log(body);
    const findInDb = await URL.find({
      redirectUrl: body.url,
    });
    if(findInDb.length>0) return res.status(500).json({ message: ALREADY_EXISTS_ERROR, shortId:findInDb[0].shortId });
    const shortId = nanoid(9);
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });
    return res.status(201).json({ shortId: shortId });
  } catch (err) {
    return res.status(500).json({ message: GENERIC_SERVER_ERROR });
  }
}

export async function handleRedirect(req: Request, res: Response) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId: shortId,
      },
      { $push: { visitHistory: { timestamp: new Date().toDateString() } } }
    );
    if(!entry) return res.status(400).json({ message: NOT_FOUND_ERROR });
    return res.redirect(entry.redirectUrl);
  } catch (err: any) {
    return res.status(500).json({ message: GENERIC_SERVER_ERROR });
  }
}

export async function handleAnalytics(req: Request, res: Response) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    return res.json({
      redirectUrl: entry.redirectUrl,
      totalClicks: entry.visitHistory.length,
      timeEntries: entry.visitHistory,
    });
  } catch (err) {
    return res.status(500).json({ message: GENERIC_SERVER_ERROR });
  }
}

export async function handleAllAnalytics(req: Request, res: Response) {
  try {
    const entry = await URL.find({}).sort({createdAt:-1});
    return res.json(entry);
  } catch (err) {
    return res.status(500).json({ message: GENERIC_SERVER_ERROR });
  }
}
