import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());

app.get("")

app.listen(5000, () => {
    console.log(chalk.blue("Servidor funcionando na porta 5000"))
})