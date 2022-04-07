"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// POST OPINION  SCHEMA
const postOpinion = new mongoose_1.Schema({
    img: { type: String, required: true },
    header: { type: String, required: true },
    post: { type: String, required: true },
    writerImg: { type: String, required: true },
    writerBio: { type: String, required: true },
});
module.exports = (0, mongoose_1.model)("Opinion", postOpinion);
