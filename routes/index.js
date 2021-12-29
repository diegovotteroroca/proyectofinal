var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    isInicio: true
  });
});

/* funcionamiento del formulario */
router.post('/', async function (req,res,next){
  /* console.log(req.body); */
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.comentarios;

  var obj ={
    to: 'diego@gmail.com',
    subject: 'Contacto desde la web de soderia Carlos Roca',
    html: nombre + ' se contacto a traves de la web y quiere saber mas info a este correo: ' + email + '.<br> y su Comentario es: ' + mensaje + ' .'
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, //se comunique con .env
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }

  });

  var info = await transport.sendMail(obj); //envio de los datos

  res.render('index', {
    message: 'Mensaje enviado correctamente'    
  });

});

module.exports = router;
