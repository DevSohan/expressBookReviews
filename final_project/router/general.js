const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function(req, res) {
  //Write your code here
  //res.send(JSON.stringify(books,null,4));
    const bookList = await books
    res.status(200).json(bookList)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    const isbn = req.params.isbn;
    //res.send(books[isbn])
    const book = await books[isbn]
    res.status(200).json(book)
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    const author = req.params.author;
    let element = {}
    const test = await Object.keys(books).map((id) => {
        if(books[id].author == author){
            element[id] = books[id]
        }
        
    })
    res.send(element)
    
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    const title = req.params.title;
    let element = {}
    const test = await Object.keys(books).map((id) => {
        if(books[id].title == title){
            element[id] = books[id]
        }
        
    })
    res.send(element)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
