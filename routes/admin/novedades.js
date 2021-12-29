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

/*funcionamiento de eliminar*/

router.get('/eliminar/:id', async (req,res,next) => {
  var id = req.params.id;

  await novedadesModels.deleteNovedadByID(id);
  res.redirect('/admin/novedades');
});


/*para que me muestre la vista de modificar*/

router.get('/modificar/:id', async (req,res,next) => {
  var id = req.params.id;
  var novedad = await novedadesModels.getNovedadByID(id);
  
  res.render('admin/modificar', {
    layout:'admin/layout',
    novedad
  });
});



module.exports = router;