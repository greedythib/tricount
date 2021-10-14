const User = require('../models/users');

exports.createUser = (req, res, next) => {
    console.log('[backend] receiving POST request');
    delete req.body._id
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => {res.status(201).json(user._id);})
        .catch(error => {res.status(500).json({ error });});
};

exports.getAllUsers = (req, res, next) => {
    console.log('[backend] receiving GET http request');
    User.find()
        .then(
            (users) => {res.status(200).json(users);}
        ).catch((error) => {res.status(400).json({error});})
};

exports.getUser = (req, res, next ) => {
    console.log('[backend] receiving a GET request using `findOne` method')
    User.findOne({name : req.params.name}) //FIXME: does not throw error when user not found
        .then((user) => res.status(200).json({user}))
        .catch((error) => res.status(404).json({error}));
};

exports.modifyUser = (req, res, next) => {
    console.log('[backend] Receiving a PUT request to update a user');
    const user = new User({
        _id: req.params.id,
        id: req.body.id,
        name: req.body.name,
        totalCredit: req.body.totalCredit,
        debtors: req.body.debtors,
        creditors: req.body.creditors,
    })
    User.updateOne({_id: req.params.id}, user)
        .then(() => res.status(201).json({message: 'User updated!'}))
        .catch((error) => res.status(400).json({error}));
};

exports.deleteUser = (req, res, next ) => {
  console.log('[backend] Receiving DELETE request');
  User.deleteOne({_id: req.params.id}) //FIXME: does not throw error when user not found
      .then(() => res.status(200).json({message: 'User deleted!'}))
      .catch((error) => res.status(400).json({error}));
};
