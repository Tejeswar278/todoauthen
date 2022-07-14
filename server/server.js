const express = require("express");
const cors = require('cors');
const app = express();
const port  = 3000;
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userdb = JSON.parse(fs.readFileSync('./user.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h';

function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
  }

function verifyToken(token){
return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

function isAuthenticated({username, password}){
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
  }


app.use(cors())

app.use(express.json())

app.post("/register", (req,res) => {
    console.log(req.body)
    const {username, password} = req.body;
    res.json({
        username,
        password
    })
    res.send("hell yah")


if(isAuthenticated({username, password}) === true) {
    const status = 401;
    const message = 'username and Password already exist';
    res.status(status).json({status, message});
    return
  }

fs.readFile("./user.json", (err, data) => {  
if (err) {
    const status = 401
    const message = err
    res.status(status).json({status, message})
    return
    };
    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length-1].id;

    //Add new user
    data.users.push({id: last_item_id + 1, username: username, password: password}); //add some data
    var writeData = fs.writeFile("./user.json", JSON.stringify(data), (err, result) => {  // WRITE
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        }
    });
});

const access_token = createToken({email, password})
console.log("Access Token:" + access_token);
res.status(200).json({access_token})
});

app.post('/auth/login', (req, res) => {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const {username, password} = req.body;
    if (isAuthenticated({username, password}) === false) {
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    }
    const access_token = createToken({username, password})
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token})
  })

  app.use(/^(?!\/auth).*$/,  (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      const message = 'Error in authorization format'
      res.status(status).json({status, message})
      return
    }
    try {
      let verifyTokenResult;
       verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
  
       if (verifyTokenResult instanceof Error) {
         const status = 401
         const message = 'Access token not provided'
         res.status(status).json({status, message})
         return
       }
       next()
    } catch (err) {
      const status = 401
      const message = 'Error access_token is revoked'
      res.status(status).json({status, message})
    }
  })

app.listen(port, () => {
    console.log(`running on port ${port} `)
})