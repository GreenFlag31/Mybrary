if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
// All files (footer, header) are going to be stored in 
// the layout file
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("connected"))

app.use("/", indexRouter)
app.use("/authors", authorRouter)

// routes = controller
app.listen(process.env.PORT || 3000)