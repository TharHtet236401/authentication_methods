import express from './node_modules/express/index.js';
const app = express();

// Middleware for Basic Authentication
const basicAuth = (req, res, next) => {
  // Extract Authorization header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    // Authorization header not provided
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Decode Base64 credentials (e.g., "username:password")
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [username, password] = credentials.split(':');
  
  console.log(username);
  console.log(password);

  // Verify username and password
  const validUsername = 'admin';
  const validPassword = 'password123';

  if (username === validUsername && password === validPassword) {
    // User authenticated successfully
    next();
  } else {
    // Authentication failed
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Protected Route
app.get('/protected', basicAuth, (req, res) => {
  res.json({ message: 'You can access this protected resource!' });
});

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome! Use /protected with Basic Authentication.' });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
