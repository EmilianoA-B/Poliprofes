const express = require('express');
const path = require('path');
const router = express.Router();

//callback function
router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..','public', 'pages', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(err.status || 500).send('Error loading page');
        }
    });
});

module.exports = router;