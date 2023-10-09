import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
// import cors from "cors";
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// app.use(cors({
//     origin: '*'
// }));

app.post('/events', (req, res) => {
    const event = req.body;
    axios.post('http://localhost:3001/events', event);
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4004/events', event);
    axios.post('http://localhost:4005/events', event);
    res.send({ status: 'OK' });
});

app.listen(4002, () => {
    console.log("Listening on port 4002");
})