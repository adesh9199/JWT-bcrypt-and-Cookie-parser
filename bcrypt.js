const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

app.get("/", (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.error('Error generating salt:', err);
            res.status(500).send('Error generating salt');
            return;
        }
        
        bcrypt.hash("kabutar", salt, function(err, hash) {
            if (err) {
                console.error('Error hashing password:', err);
                res.status(500).send('Error hashing password');
                return;
            }
            
            console.log(hash);
            res.send("Password hashed successfully");
        });
    });
});

app.get("/profile", (req, res) => {
    const hashedPassword = "$2a$10$PqJ7WgM85u3SzvMoLG1YX.NeVd7pmcL2PYmJvaRmJbpDuMvlWUQwG";
    
    bcrypt.compare("kabutar", hashedPassword , function(err, result) {
        if (err) {
            console.error('Error comparing password:', err);
            res.status(500).send('Error comparing password');
            return;
        }
        
        console.log(result); // Will be true or false
        res.send(result ? "Password matches" : "Password does not match");
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
