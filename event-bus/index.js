import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {

    const event = req.body;
    events.push(event);
    axios.post('http://localhost:3001/events', event).catch((err) => {
        console.log(err.message);
    });;
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
    });;
    axios.post('http://localhost:4004/events', event).catch((err) => {
        console.log(err.message);
    });;
    axios.post('http://localhost:4005/events', event).catch((err) => {
        console.log(err.message);
    });;
    res.send({ status: 'OK' });
});

app.get('/events', (_req, res) => {
    res.send(events);
})

app.listen(4002, () => {
    console.log("Listening on port 4002");
})