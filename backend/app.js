const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.get('/', (req, res, next) => {
    res.status(200).json({message: 'welcome to the backend server'});
})

// app.post('/api', (req, res, next) => {
//     console.log('receiving POST request');
//     delete req.body._id
//     const user = new User({
//         ...req.body
//         });
//     user.save()
//         .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//         .catch(error => res.status(400).json({ error }));
// });

// app.use('/api', (req, res, next) => {
//     console.log('[backend] receiving GET http request');
//     // res.status(200).json({message: 'GET request received from server'});
//     User.find()
//         .then(users => res.status(200).json(users))
//         .catch(error => res.status(400).json({error}));
// });

// app.use((req, res, next) => {
//     res.status(200).json({message: 'request received sucessfully'});
// });



module.exports = app;