import nodemailer from "nodemailer"

 export const emailNuevaPassword = async(datos) => {
   const { email, usuario, token} = datos

   const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6cf3dd9d55c407",
      pass: "c3b77b3819ee6a"
    }
  });

  const info = await transport.sendMail({
from: ' "Blogpost.com"   <cuentas@blogpost.com>',
to: email,
subject: "Blogpost",
text: "Comprueba tu cuenta en Blogpost",
html: `<p>Hola: ${usuario} Crear tu nueva contraseña</p>
<p>A continuacion el enlace para reestablecer tu contraseña:</p>
<a href="http://localhost:3000/olvide-password/${token}">  Comprobar cuenta</a>





`


  })
  
}

