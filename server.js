const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'project');

// Explicit MIME-type mapping to bypass strict browser execution filters (MIME type mismatch)
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript', // Crucial: serves JSX as executable scripts so Babel standalone executes them
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  // Map index route
  let relativeUrl = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(PUBLIC_DIR, relativeUrl);
  
  // Strips any URL query parameters or hashes
  filePath = filePath.split('?')[0].split('#')[0];

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 Not Found: ${relativeUrl}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`BudgetBuddy 2 Mockup served successfully!`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[ERROR] Port ${PORT} is currently occupied by another process!`);
    console.error(`Please close any other servers or processes running on port ${PORT}.\n`);
    process.exit(1);
  } else {
    console.error('Server error encountered:', err);
  }
});
