import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import { createConnection } from "typeorm";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ path: path.join(__dirname, "../.env") });

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("jwt-secret", process.env.JWTKEY);

app.listen(PORT, () => {
    console.log(PORT, "번 포트에서 대기 중");

    createConnection()
        .then(() => {
            console.log("데이터베이스 연결 성공");
        })
        .catch((err) => {
            console.error(err);
        });
});;