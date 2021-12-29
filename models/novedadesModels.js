var pool = require('./bd');

async function getNovedades(){
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj) {
    try{
        var query = "insert into novedades set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
    }catch (error){
        console.log(error);
        throw error;
    }
}

async function deleteNovedadByID(id) {
    var query = 'delete from novedades where id= ?';
    var rows = await pool.query(query,[id]);
    return rows;
}

async function getNovedadByID(id){
    var query = 'select * from novedades where id= ?';
    var rows = await pool.query(query,[id]);
    return rows[0];
}


module.exports = { getNovedades, insertNovedad, deleteNovedadByID, getNovedadByID }