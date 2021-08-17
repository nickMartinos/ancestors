const express = require('express');
const app = express();
const port = 5000;
const people = require('./people');
const families = require('./families');

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('App listening to port!');
});

app.get('/tree_data', (req,res) => {
    let tmpData = 
    {
        "nodes": [ 
            { 
            "id": "id1",
            "name": "name1",
            "label": "name1",
            "val": 10,
            "color": "black"
            },
            { 
            "id": "id2",
            "name": "name2",
            "val": 9,
            "color": "black"
            },
            { 
            "id": "id3",
            "name": "name2",
            "val": 8 ,
            "color": "black"
            },
            { 
            "id": "id4",
            "name": "name2",
            "val": 7,
            "color": "black"
            },
            { 
            "id": "id5",
            "name": "name2",
            "val": 6,
            "color": "black"
            },
            { 
            "id": "id6",
            "name": "name2",
            "val": 5,
            "color": "black"
            },
            { 
            "id": "id7",
            "name": "name2",
            "val": 4,
            "color": "black"
            }
        ],
        "links": [
            {
                "source": "id1",
                "target": "id2"
            },
            {
                "source": "id3",
                "target": "id4"
            },
            {
                "source": "id2",
                "target": "id3"
            },
            {
                "source": "id3",
                "target": "id4"
            },
            {
                "source": "id3",
                "target": "id5"
            }
        ]
    };

    res.send(tmpData);
});

app.get('/express_backend', (req, res) => {
    res.send({express: "EXPRESS PROPERLY SET UP"});
});

app.get('/people', async (req, res) => {
    const entry = await people.getAll();
    res.send(JSON.stringify(entry));
});

app.get('/people/:name', async (req, res) => {
    let name = req.params.name;
    const entry = await people.getByName(name);
    res.send(JSON.stringify(entry));
});

app.get('/families', async (req, res) => {
    const entry = await families.getAll();
    res.send(JSON.stringify(entry));
})

app.get('/families/:id', async (req, res) => {
    let id = req.params.id;
    const entry = await families.getById(id);
    res.send(JSON.stringify(entry));
})
