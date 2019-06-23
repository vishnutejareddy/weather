const path = require("path")
const express =  require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,"../public")
const partialsPath = path.join(__dirname,"/partials")
const viewsPath = path.join(__dirname,"/views")

app.set("view engine", "hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        name: "vishnu",
        title: "main page"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        name: "vishnu",
        title: "help page"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send("please provide an address")
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        forecast(longitude, latitude,(error1,data1)=>{
            res.send({latitude,longitude,place,data1})
        })
    })
})

app.get("*",(req,res)=>{
    res.send("404 page")
})

app.listen(port,()=>{
    console.log("server is up and running")
})