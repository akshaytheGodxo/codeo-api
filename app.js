import express from "express"
import cors from "cors";
import mainRouter from "./routes/mainRouter.js";
const app = express();
const PORT = 8080;

const allowed_links = ["http://localhost:3000"];
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use("/auth", mainRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})