import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import conectarDB from "./config/db.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"


const app = express()
app.use(express.json())

dotenv.config()
conectarDB()

const whitelist = ["http://localhost:3000"]

const corsOptions = {
origin: function(origin, callback){
    if(whitelist.includes(origin)){
        callback(null,true)
    }
    else{
        callback(new Error("Error de Cors"))
    }
}

}


 
app.use(cors(corsOptions))

app.use("/api/usuarios", usuarioRoutes)
app.use("/api/blog", blogRoutes)



const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`)
})