import  jwt  from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async(req, res, next) => {
  let token;

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
try {
    token = req.headers.authorization.split(" ")[1]
console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const usuario = req.usuario
console.log(usuario)
    req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -_vv")
   return next()
} catch (error) {
    return res.status(404).json({msg: "Hubo un error"})
}


  }

if(!token){
    const error = new Error("Token no valido")
   return res.status(401).json({msg: error.message})
}

    next()
}

export default checkAuth