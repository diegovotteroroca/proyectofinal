var express = require('express');
var router = express.Router();
var novedadesModels = require('../../models/novedadesModels');

router.get('/', async function(req, res, next) {

  var novedades = await novedadesModels.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario:req.session.nombre,
        novedades
    });
  });


module.exports = router;