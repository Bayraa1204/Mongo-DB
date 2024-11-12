const express = require("express");
const app = express();
app.use(express.json());
const userRoute = require("./Routes/userRoute");

app.use("/user", userRoute); 

app.listen(8080, console.log("your server is now running on server 8080"));
