const db = require('../database/database')

exports.login = async (req,res) => {

const {email, senha} = req.body

try{

const result = await db.query(
"SELECT * FROM usuarios WHERE email=$1 AND senha=$2",
[email,senha]
)

if(result.rows.length > 0){

const usuario = result.rows[0]

res.json({
tipo: usuario.tipo
})

}else{

res.json({
tipo: null
})

}

}catch(err){
console.log(err)
}

}