import { Schema,model } from "mongoose"


interface Login {
    username: String;
    password: String;

}

// Post  Schema
const loginSchema = new Schema<Login>({
    username:{type: String, required:true},
    password:{type: String, required:true},
})

module.exports = model<Login>("Login",loginSchema)