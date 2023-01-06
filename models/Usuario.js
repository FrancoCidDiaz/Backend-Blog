import mongoose from "mongoose";
import bcrypt from "bcrypt"


const usuarioSchema = mongoose.Schema({
usuario:{
    type: String,
    required: true,
    trim: true
  
},
email: {
    type: String,
    required: true,
    trim: true,
    unique: true  
},
contraseña: {
    type: String,
    required: true,
    trim: true  
},
token: {
    type: String,
   
},
confirmado: {
    type: Boolean,
    default: false
}
 
},
{
    timestamps: true,
}
)


usuarioSchema.pre("save", async function (next){
    if(!this.isModified("contraseña")){
        next()
    }
const salt = await bcrypt.genSalt(10)
this.contraseña = await bcrypt.hash(this.contraseña, salt)

})


usuarioSchema.methods.comprobarContraseña = async function (contraseñaFormulario){
    return await bcrypt.compare(contraseñaFormulario, this.contraseña)
}


const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario