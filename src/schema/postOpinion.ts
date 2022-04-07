import { model, Schema } from "mongoose"

interface Opinion {
    img: String;
    header: String;
    post: String;
    writerImg: String;
    writerBio: String;
}

// POST OPINION  SCHEMA
const postOpinion = new Schema<Opinion>({
    img:{type: String, required:true},
    header:{type: String, required:true},
    post:{type: String, required:true},
    writerImg:{type: String, required:true},
    writerBio:{type:String, required:true},
})

module.exports = model<Opinion>("Opinion",postOpinion)
