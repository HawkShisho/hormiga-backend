require("dotenv").config() //importar config variables entorno
const express = require("express") //importar express
const app = express() //invocar funcion express
const port = process.env.PORT || "3000" //utilizando variable de entorno
const {getConnection} = require("./utils/db")//importando archivo creado
const cors = require("cors")
//npm init --yes


app.use(express.json())
app.use(cors())

app.get("/",async (req,res) => {
    const pool = await getConnection()
    const {rowsAffected,recordset} = await pool.request().query("select * from tb_hormiga")
    
    console.log(recordset)
    res.json(recordset)
})

app.post("/",async (req,res) => {
    //console.log(req.body)
    const {id} = req.body
    console.log(id)
    const pool = await getConnection()
    const {rowsAffected,recordset} = await pool.request().query(`delete from tb_hormiga where tbh_id ='${id}' `)
    res.send("Informacion eliminada!")
})

app.listen(port,() => {
    console.log("Hola mundo")
})
