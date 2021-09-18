const  express = require("express");
const mongoose = require("mongoose");
const  cors =  require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const Cards = require("./schema/dbCards.js");

// App Config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// DB Config
mongoose 
 .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })

})

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
    
})


// Listener
app.listen(port, ()=>{
    console.log("backend server is running! port: "+port)
})