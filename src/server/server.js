projectData = [];
const express = require('express');
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');

/*Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Cors
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/viewData', (req, res) => {
    res.send(projectData);
})

app.post('/myContacts', (req, res) => {
    const body = req.body;
    let data = {
        name: body.name,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        message: body.message
    }
    projectData.push(data);
    res.send('Información enviada con éxito');
    console.log(projectData);
})

const port = 3000;

const listening = () => console.log(`Running on localhost: ${port}`);

const server = app.listen(port, listening);