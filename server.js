const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const publicDir = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];

    // Serve the main website
    if (url === '/' || url === '/home') {
        return sendFile(res, 'index.html');
    }

    // Serve the products page
    if (url === '/products') {
        return sendFile(res, 'products.html');
    }

    // Serve the about page
    if (url === '/about') {
        return sendFile(res, 'about.html');
    }

    // Serve the contact page
    if (url === '/contact') {
        return sendFile(res, 'contact.html');
    }

    // Serve CSS and JavaScript files
    if (url.startsWith('/css/') || url.startsWith('/js/')) {
        const filePath = path.join(publicDir, url);
        if (filePath.startsWith(publicDir)) {
            return fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    return res.end('File not found');
                }
                const ext = path.extname(filePath);
                const contentType = ext === '.css' ? 'text/css' : 'text/javascript';
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            });
        }
    }

    // Handle unknown routes
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
        <h1>404 - Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <a href="/">Return to Home</a>
    `);
});

function sendFile(res, fileName) {
    const filePath = path.join(publicDir, fileName);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Unable to load page');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

server.listen(PORT, () => {
    console.log(`Tech Product Showcase running at http://localhost:${PORT}`);
});
