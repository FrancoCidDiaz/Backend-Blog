import express  from "express"
import  {
    crearBlog,
    editarBlog,
    eliminarBlog,
    obtenerBlog,
    obtenerBlogs  
} from '../controllers/blogController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

router.post("/", checkAuth, crearBlog)

router.get("/", checkAuth, obtenerBlogs)

router.route("/:id").get(checkAuth, obtenerBlog).put(checkAuth, editarBlog).delete(checkAuth, eliminarBlog)





export default router