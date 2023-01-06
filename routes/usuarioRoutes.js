import express from "express"
import { autenticar, registrar, confirmar, olvidePassword, comprobarToken, nuevaContraseña, perfil } from "../controllers/usuarioController.js"
import checkAuth from "../middlewares/checkAuth.js"

const router = express.Router()

router.post("/", registrar)

router.post("/login", autenticar)

router.get("/confirmar/:token", confirmar)

router.post("/olvide-password", olvidePassword)

router.route("/olvide-password/:token").get(comprobarToken).post(nuevaContraseña)

router.get("/perfil", checkAuth, perfil)

export default router