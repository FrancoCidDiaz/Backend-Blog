import nodemailer from "nodemailer"

export const emailRegistro = async(datos) => {
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
html: `<p>Hola: ${usuario} Comprueba tu cuenta en Blogpost</p>
<p>Tu cuenta ya esta casi lista , solo debes confirmarla en el siguiente enlace:</p>
<a href="http://localhost:3000/confirmar/${token}">  Comprobar cuenta</a>

<p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>



`


  })
  
}