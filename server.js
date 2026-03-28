const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const FOLDER = 'C:/Users/09043138/MyProject/pomodo-todo';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(FOLDER, req.url === '/' ? 'index.html' : req.url);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('===========================================');
  console.log('PomoTodo app is running!');
  console.log('');
  console.log('To test on this computer:');
  console.log(`  Open: http://localhost:${PORT}`);
  console.log('');
  console.log('To test on phone (same WiFi):');
  
  const { execSync } = require('child_process');
  try {
    const ip = execSync('ipconfig').toString();
    const match = ip.match(/IPv4.*?(\d+\.\d+\.\d+\.\d+)/);
    if (match) {
      console.log(`  Open: http://${match[1]}:${PORT}`);
    }
  } catch (e) {}
  
  console.log('');
  console.log('===========================================');
});