import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from "fs"

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the dist directory
app.use('/out', express.static(path.join(__dirname, '..', 'out')));
app.use('/assets',express.static(path.join(__dirname,'..', 'assets')));
//app.use(express.static(path.join(__dirname, 'Application.css')));
app.use(express.static(path.join(__dirname,'..', 'Application.css')));
app.get('/Application.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, '../Application.css'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Application.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.text());
app.post('/save', (req, res) => {
  //const jsonContent = JSON.stringify(req.body);
  console.log("server received request")
  console.log(req.body)
  if (req.body) {
    const boardStrings = req.body.split('\n');
    const filePath = path.join(__dirname, 'data.txt');

    // Join all board strings with newline characters
    const fileContent = boardStrings.join('\n');

    fs.writeFile(filePath, fileContent, { flag: 'w' }, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Error saving data');
      } else {
        console.log('Text file written successfully');
        res.send('Data saved successfully');
      }
    })
  }else {
    console.error('Received empty JSON data');
    res.status(400).send('Received empty JSON data');
  }
});
