import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro } from "../helpers/email.js";
import { emailNuevaPassword } from "../helpers/emailNuevaPassword.js"

const registrar =  async (req,res) => {

   const {email} = req.body
   const existeUsuario = await Usuario.findOne({email})
   if(existeUsuario){
      const error = new Error('Usuario ya registrado') 
      return res.status(400).json({ msg: error.message})
   }

   try {
    const usuario = new Usuario(req.body)
    usuario.token = generarId()
     const header = (req.header)
    const usuarioAlmacenado = await usuario.save()
   
  
emailRegistro({
   usuario: usuarioAlmacenado.usuario,
   email: usuarioAlmacenado.email,
   token: usuarioAlmacenado.token
})

   } catch (error) {
    console.log(error)
   }




   res.json({msg:"creando usuario"})
 
}



const autenticar = async (req, res) => {

   const {email, contraseña} = req.body   

const usuario = await Usuario.findOne({email})

if(!usuario){
   const error = new Error("El usuario no existe")
   return res.status(404).json({msg: error.message})
}
if(!usuario.confirmado){
   const error = new Error ("Tu cuenta no ha sido confirmada")
   return res.status(403).json({msg: error.message})
}


if(await usuario.comprobarContraseña(contraseña)){
   res.json({
_id: usuario._id,
usuario: usuario.usuario,
email: usuario.email,
token: generarJWT(usuario._id)

   })
}
else{
   const error = new Error("La contraseña es incorrecta")
   return res.status(403).json({msg: error.message})
}

}


const confirmar = async(req,res) => {
   const {token} = req.params
   const usuarioConfirmar = await Usuario.findOne({token})
if(!usuarioConfirmar){
   const error = new Error("Token no valido")
   return res.status(403).json({msg: error.message})
}

try {
   usuarioConfirmar.confirmado = true
   usuarioConfirmar.token = ""
   await usuarioConfirmar.save()
   res.json({msg: "Usuario confirmado correctamente"})
} catch (error) {
   console.log(error)
}


}



const olvidePassword = async (req,res) => {
const {email} = req.body
const usuario = await Usuario.findOne({email})
if(!usuario){
   const error = new Error("El usuario no existe")
   return res.status(404).json({msg: error.message})
}

try {
   usuario.token = generarId()
  await usuario.save()
  emailNuevaPassword({
   usuario: usuario.usuario,
   email: usuario.email,
   token: usuario.token
})
  res.json({msg: "Hemos enviado un email con las instrucciones"})
} catch (error) {
   setAlerta({msg: error.response.data.msg, error: true})
}



}


const comprobarToken = async (req,res) =>{
const {token} = req.params
const tokenValido = await Usuario.findOne({token})

if(tokenValido){
   res.json({msg: "Token valido y el usuario existe"})
}
else{
   const error = new Error ("Token no valido")
   return res.status(404).json({msg: error.message})
}

}


const nuevaContraseña= async(req,res) => {

const { token } = req.params
const { contraseña } = req.body

const usuario = await Usuario.findOne({ token})

if(usuario){
   usuario.contraseña = contraseña
   usuario.token = ""
try {
   await usuario.save()
   res.json({msg: "Contraseña modificada correctamente"})
} catch (error) {
   console.log(error)
}
}
else{
   const error = new Error("Token no valido")
   return res.status(404).json({msg: error.message})
}

}


const perfil = async (req, res) => {
 const { usuario } = req
 res.json(usuario)
}



export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevaContraseña, perfil };