import cors from "cors";
import express from "express";
import pathRoutes from "./routes/pathRoutes.js";

const app = express();

app.use(cors({
   origin:"https://neo-route-client.vercel.app"
}
));
app.use(express.json());
app.use("/api", pathRoutes);

export default app;
