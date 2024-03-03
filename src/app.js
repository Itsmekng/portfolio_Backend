import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
       methods: ["GET", "POST", "PUT", "DELETE"],
      

}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// import Order from "./routes/order.routes.js";
// import trial from "./routes/Product.routes.js";
import User from "./routes/User.routes.js";
import ContactUs from "./routes/ContactUs.routes.js";
import  Portfolio  from "./routes/project.routes.js";



// app.use("/fanscart",Order)

// app.use("/fanscart",trial)

app.use("/api/portfolio",User)

app.use("/api/portfolio",ContactUs)

app.use("/api/portfolio",Portfolio)




app.get('/test-cookies', (req, res) => {
    console.log(req.cookies);
    res.send('Check your console for cookies');
});




export { app }
