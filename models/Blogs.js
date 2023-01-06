import mongoose, { mongo } from "mongoose";

const blogsSchema = mongoose.Schema({
titulo: {
    type: String,
    trim: true,
    required: true  
}, 
contenido: {
type: String,
required: true,
trim:true
},
fechaCreado:{
    type: Date,
    default: Date.now()
},
creador:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
}




},
{
    timestamps: true
}
)

const Blog = mongoose.model('Blog', blogsSchema)
export default Blog
