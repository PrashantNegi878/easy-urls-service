"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAllAnalytics = exports.handleAnalytics = exports.handleRedirect = exports.generateShortURL = void 0;
const nanoid_1 = require("nanoid");
const url_1 = require("../models/url");
const constants_1 = require("../constants");
function generateShortURL(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            console.log(body);
            const findInDb = yield url_1.URL.find({
                redirectUrl: body.url,
            });
            if (findInDb.length > 0)
                return res.status(500).json({ message: constants_1.ALREADY_EXISTS_ERROR, shortId: findInDb[0].shortId });
            const shortId = (0, nanoid_1.nanoid)(9);
            yield url_1.URL.create({
                shortId: shortId,
                redirectUrl: body.url,
                visitHistory: [],
            });
            return res.status(201).json({ shortId: shortId });
        }
        catch (err) {
            return res.status(500).json({ message: constants_1.GENERIC_SERVER_ERROR });
        }
    });
}
exports.generateShortURL = generateShortURL;
function handleRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shortId = req.params.shortId;
            const entry = yield url_1.URL.findOneAndUpdate({
                shortId: shortId,
            }, { $push: { visitHistory: { timestamp: new Date().toDateString() } } });
            if (!entry)
                return res.status(400).json({ message: constants_1.NOT_FOUND_ERROR });
            return res.redirect(entry.redirectUrl);
        }
        catch (err) {
            return res.status(500).json({ message: constants_1.GENERIC_SERVER_ERROR });
        }
    });
}
exports.handleRedirect = handleRedirect;
function handleAnalytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shortId = req.params.shortId;
            const entry = yield url_1.URL.findOne({ shortId });
            return res.json({
                redirectUrl: entry.redirectUrl,
                totalClicks: entry.visitHistory.length,
                timeEntries: entry.visitHistory,
            });
        }
        catch (err) {
            return res.status(500).json({ message: constants_1.GENERIC_SERVER_ERROR });
        }
    });
}
exports.handleAnalytics = handleAnalytics;
function handleAllAnalytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entry = yield url_1.URL.find({}).sort({ createdAt: -1 });
            return res.json(entry);
        }
        catch (err) {
            return res.status(500).json({ message: constants_1.GENERIC_SERVER_ERROR });
        }
    });
}
exports.handleAllAnalytics = handleAllAnalytics;
