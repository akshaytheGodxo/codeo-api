import express from "express"
import cors from "cors";
import mainRouter from "./routes/mainRouter.js";
const app = express();
const PORT = 8080;

const allowed_links = ["http://localhost:3000"];
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use("/auth", mainRouter);
app.use((req, res, next) => {
    const origin = req.headers.oring;

    if (allowed_links.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {

        return res.status(200).end();

    }
    next();
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})