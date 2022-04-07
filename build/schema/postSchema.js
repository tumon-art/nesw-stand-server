"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Post  Schema
const postSchema = new mongoose_1.Schema({
    img: { type: String, required: true },
    header: { type: String, required: true },
    post: { type: String, required: true },
    cont: { type: String,
        enum: ['Middle East', 'North America', 'Asia', 'South Asia', 'Europe', 'Africa', 'South America'],
        required: true },
});
module.exports = (0, mongoose_1.model)("Post", postSchema);
