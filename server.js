import express  from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js"
import pkg from 'express-handlebars';
const { engine } = pkg;

//Ajout de la possibilité d'utiliser des variables de config
dotenv.config();

const PORT = process.env.PORT || 3002;

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json())

app.use(routes);

app.listen(PORT, () => console.log(`server is running on ${PORT}`) );
