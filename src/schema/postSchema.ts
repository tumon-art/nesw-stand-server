import { model, Schema } from "mongoose"

interface Post {
    img: String;
    header: String;
    post: String;
    cont: 'Middle East' | 'North America' | 'Asia' 
    | 'South Asia' | 'Europe' | 'Africa' | 'South America';
}


// Post  Schema
const postSchema = new Schema<Post>({
    img:{type: String, required:true},
    header:{type: String, required:true},
    post:{type: String, required:true},
    cont:{type: String, 
        enum : ['Middle East','North America','Asia','South Asia','Europe','Africa','South America'],
        required: true},
})
  
module.exports = model("Post",postSchema)
