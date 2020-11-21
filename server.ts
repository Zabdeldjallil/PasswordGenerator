import express from 'express'
import bodyParser from 'body-parser'
import { Sequelize, DataTypes } from 'sequelize'
const Cryptr=require("cryptr")
require('dotenv').config()

const app=express();
const cryptr=new Cryptr(process.env.password)
const PORT=8080;

app.use(express.static("public"));
app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

const sequelize = new Sequelize('CRYPT', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'  
  });

const Saving=sequelize.define('Saving', {
    First: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Second: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    });
/*(async function(){
    await Saving.sync({});
    console.log("The table for the User model was just (re)created!");
  })()*/


app.get("/", (req, res) =>{
    res.render("generate")
})
app.get("/myPass",async(req, res) =>{
    const results = await Saving.findAll();
    const sended:string[]=[];
    /*for (let index = 0; index < results.length; index++) {
        const element = results[index];
        cryptr.decrypt(results[index].First)
    }*/
    for (let index = 0; index < results.length; index++) {
        const element = results[index];
        const First=cryptr.decrypt(element.getDataValue("First")).concat(" ")
       const Second= cryptr.decrypt(element.getDataValue("Second"))
       let res=First.concat(Second)
        sended.push(res)
    }
   //console.log(results[0].getDataValue("First"))
   //console.log(sended)
    res.render("myPass",{results:sended,pass:process.env.password})
})
app.post("/",async (req, res) =>{
    const encryptedString = cryptr.encrypt(req.body.username);
    const encryptedString1 = cryptr.encrypt(req.body.generated);
    //const decryptedString = cryptr.decrypt(encryptedString);
    await Saving.create({First:encryptedString,Second:encryptedString1})
    res.redirect("/")
})

app.listen(PORT, () =>console.log("Server started on "+PORT))