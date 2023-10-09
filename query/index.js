import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import axios from "axios";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));

const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = {
            id, title, comments: []
        };
    }
    else if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    else if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
}


app.get('/posts', (_req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(4004, async () => {
    console.log("Listening on 4004");
    const res = await axios.get('http://localhost:4002/events');

    for (let event of res.data) {
        console.log("Processing event: ", event.type);
        handleEvent(event.type, event.data);
    }

});
