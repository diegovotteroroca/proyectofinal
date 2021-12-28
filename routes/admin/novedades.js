var express = require('express');
var router = express.Router();
var novedadesModels = require('../../models/novedadesModels');

/*listado de novedades*/
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModels.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

/*vista del formulario de agregar*/

router.get('/agregar', function (req,res,next) {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

/*procesa o da funcionamiento al boton guardar*/

router.post('/agregar', async function (req,res,next) {
  try {
    console.log(req.body);

    if(req.body.titulo != "" && req.body.fecha != "" && req.body.cuerpo != ""){
      await novedadesModels.insertNovedad(req.body);
      res.redirect('/admin/novedades');
    }else{
      res.render('admin/agregar' ,{
        layout:'admin/layout',
        error:true,
        message: 'Todos los campos son requeridos'
      })
    }
  }catch (error) {
    console.log(error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    });
  }  
});

module.exports = router;