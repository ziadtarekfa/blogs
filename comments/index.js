import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4002/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })
    res.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);
    res.send({});
})

app.listen(4000, () => {
    console.log("Listening on port 4000");
});
