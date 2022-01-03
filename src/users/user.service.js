const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('src/common/role');
// const Group = require('src/common/Group');
// const Collection = require('src/common/Collection');


const managers = [];
const groups = [
    { "name" : "Group1", "collectionIds": ["Collection1", "Collection2"]},
    { "name" : "Group2", "collectionIds": ["Collection2"]}
];

const collection = ["Collection1", "Collection2"];
const items = [];   

const users = [
    { id: 1, username: 'globalManager', password: 'globalManager',email:'globalManager@g.com', role: [Role.GlobalManager]},
    { id: 2, username: 'user', password: 'user',email:'user@g.com', role: [Role.Manager]}
];

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    deleteUser
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret,{expiresIn: "2h"});
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    console.log("getAll"+JSON.stringify(groups));
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function create(userParam) {
    // validate
    if (await userExists(userParam.username)) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const groupIdCheck = await checkIfGroupPresent(userParam.role);
    if (!groupIdCheck.isPresent) {
        throw 'Group id ' + JSON.stringify(groupIdCheck.groupIds) + ' not present';
    }

    const user = {
        id: users.length + 1,
        username: userParam.username,
        password: userParam.password,
        email: userParam.email,
        role: userParam.role
    };

    users.push(user);
    return user;
}

async function deleteUser(userParam) {
    // validate
    if (await !userExists(userParam.username)) {
        throw 'Username "' + userParam.username + '" is Not present';
    }

    const user = users.find(u => u.username === userParam.username);
    // delete user
    users.splice(users.indexOf(user), 1);
    return user;
}

function userExists(username) {
    return users.find(u => u.username === username)
}

function checkIfGroupPresent(roles){
    let isPresent = false;
    const groupIdsMissing = [];
    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        for (let j = 0; j < groups.length; j++) {
            const group = groups[j];
            if (group.name === role.groupId) {
                isPresent = true;
                break;
            } else {
                if (groupIdsMissing.indexOf(role.groupId) === -1) {
                    groupIdsMissing.push(role.groupId);
                }
            }
        }
    }
    return {"isPresent":isPresent,"groupIds":groupIdsMissing};
}