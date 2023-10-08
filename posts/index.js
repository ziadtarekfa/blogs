import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { randomBytes } from "crypto";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));
const posts = {};

app.get('/posts', (_req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id, title
    }
    res.status(201).send(posts[id]);
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});
