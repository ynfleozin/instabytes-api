import express from "express";
import cors from "cors";
import routes from "./src/routes/postsRoutes.js";

const app = express();

app.use(cors());

app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
    console.log("Starting server...");
});
