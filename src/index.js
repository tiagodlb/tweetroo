import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(json());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const user = req.body;
  if (user.username.length === 0) {
    return res.send("Todos os campos são obrigatórios").status(400);
  }
  if (user.avatar.length === 0) {
    return res.send("Todos os campos são obrigatórios").status(400);
  }
  users.push(user);
  res.send(user).status(201);
});

app.post("/tweets", (req, res) => {
  const tweet = {
    username: req.headers.user,
    tweet: req.body.tweet,
    avatar: users.find((user) => user.username === req.headers.user).avatar,
  };

  if (tweet.username.length === 0) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  if (tweet.tweet.length === 0) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  tweets.unshift(tweet);
  res.status(201).send(tweet);
});

app.get("/tweets", (req, res) => {
  res.send(tweets).status(200);
});

app.get("/tweets/:username", (req, res) => {
  let username = req.params.username;
  let usernameMessages = tweets.filter((user) => username === user.username);
  res.send(usernameMessages).status(200);
});

app.listen(5000, () => {
  console.log(chalk.blue("Servidor funcionando na porta 5000"));
});
