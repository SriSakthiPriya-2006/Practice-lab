const http = require('http');
const sql = require('mssql');

const config = {
  user: 'YOUR_SQL_USERNAME',
  password: 'YOUR_SQL_PASSWORD',
  server: 'localhost',
  database: 'EventDB',
  options: { trustServerCertificate: true }
};

async function handleRequest(req, res) {
  if (req.method === 'POST' && (req.url === '/createEvent' || req.url === '/register')) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      const data = JSON.parse(body);
      try {
        await sql.connect(config);
        if (req.url === '/createEvent') {
          await sql.query`INSERT INTO Events (EventName, EventDate) VALUES (${data.eventName}, ${data.eventDate})`;
          res.end('Event Created Successfully');
        } else {
          await sql.query`INSERT INTO Registrations (StudentName, EventName) VALUES (${data.studentName}, ${data.eventName})`;
          res.end('Student Registered Successfully');
        }
      } catch (err) {
        res.end('Error: ' + err.message);
      }
    });
  } else {
    res.end('Server Running...');
  }
}

http.createServer(handleRequest).listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
