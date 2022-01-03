const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('src/common/authorize')
const Role = require('src/common/role');

router.post('/authenticate', authenticate);     
router.get('/', authorize(Role.Manager), getAll); 
router.get('/:id', authorize(), getById);      
router.post('/', authorize(), getById);         
router.delete('/', authorize(), deleteUser);         
router.post('/create', authorize(), createUser);         
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    if (!isGlobalManager(currentUser)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function createUser(req, res, next) {
    // console.log("------------------");
    // console.log(req.body);
    const currentUser = req.user;
    // console.log("currentUser: " + JSON.stringify(currentUser));
    if (!isGlobalManager(currentUser)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteUser(req, res, next) {
    const currentUser = req.user;
    if (!isGlobalManager(currentUser)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.deleteUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function isGlobalManager(currentUser){
    let isGlobal = false;
    for (let i = 0; i < currentUser.role.length; i++) {
        const role = currentUser.role[i];
        if (role.role === Role.GlobalManager.role) {
            isGlobal = true;
            break;
        } 
    }
    return isGlobal;
}
