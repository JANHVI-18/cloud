// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'Janhvi@18',
    database: 'techstar'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

// Create Express application
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a route to handle form submission
app.post('/signup', (req, res) => {
    // Retrieve form data
    const { name, email, password, course } = req.body;

    // Insert user data into the database
    const sql = `INSERT INTO users (name, email, password, course) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [name, email, password, course], (err, result) => {
        if (err) {
            console.error('Error inserting user data: ' + err);
            res.status(500).send('Error inserting user data');
            return;
        }
        console.log('User data inserted successfully');
        res.status(200).send('User data inserted successfully');
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
