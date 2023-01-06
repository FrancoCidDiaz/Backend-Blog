import Blog from "../models/Blogs.js"
import Usuario from "../models/Usuario.js"

const crearBlog = async(req,res) => {


   // const {body} = (req.body)


 const blog = new Blog(req.body)

 blog.creador = req.usuario._id
 //console.log(blog)
//console.log(blog.creador)



 try {
 const blogAlmacenado = await blog.save()
 res.json(blogAlmacenado)
 console.log(blogAlmacenado) 
 //console.log(req.usuario)  
 } catch (error) {
     console.log(error)
     res.json({})
 }

}

const obtenerBlogs = async(req,res) => {
    const blogs = await Blog.find().where("creador").equals(req.usuario)
    res.json(blogs)

}

const editarBlog = async(req,res) => {
    
    const {id} = req.params
 
    const blog = await Blog.findById(id)

    const usuario = await Usuario.findById(blog.creador)

    if(!blog){
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if(blog.creador.toString() !== usuario._id.toString()){
        const error = new Error("Accion no valida")
        return res.status(404).json({msg: error.message})  
    }

    blog.titulo = req.body.titulo || blog.titulo
    blog.contenido = req.body.contenido || blog.contenido

try {
   const blogAlmacenado = await blog.save() 
   res.json(blogAlmacenado)
} catch (error) {
   console.log(error) 
}

}

const eliminarBlog = async(req,res) => {
    const {id} = req.params
 
    const blog = await Blog.findById(id)
    console.log(blog)
   
    const usuario = await Usuario.findById(blog.creador)
    console.log(usuario)

    if(!blog){
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if(blog.creador.toString() !== usuario._id.toString()){
        const error = new Error("Accion no valida")
        return res.status(404).json({msg: error.message})  
    }




    try {
        await blog.deleteOne()
      res.json({msg: "Blog eliminado"})
     } catch (error) {
        console.log(error) 
     }  
}

const obtenerBlog = async(req,res) => {

    const {id} = req.params
 
    const blog = await Blog.findById(id)

    if(!blog){
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if(blog.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Accion no valida")
        return res.status(404).json({msg: error.message})  
    }
res.json(blog)


}


export {
 crearBlog,
 editarBlog,
 eliminarBlog,
 obtenerBlog,
 obtenerBlogs   
}