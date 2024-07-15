const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get("/", (req, res) => {
    let token = jwt.sign({ email: "abc@gmail.com" }, "secret");
    res.cookie("token", token); 
    console.log(token);
    res.send("working");
});

app.get("/profile", (req, res) => {
    try {
        let data = jwt.verify(req.cookies.token, "secret");
        console.log(data);
        res.send("Check your console for the cookie value");
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).send('Invalid token');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
