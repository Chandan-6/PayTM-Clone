import express from "express";
const app = express();
import cors from "cors";
import {connectDB} from "./dbConfig/dbConnection.js";
import user from "./routes/user.js";
import account from "./routes/account.js";

connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.status(200).json({message : "PayTM-Clone"});
})

app.use("/api/v1/user", user);
app.use("/api/v1/account", account);


app.listen(3000, () => {
    console.log("Server listening...");
});

