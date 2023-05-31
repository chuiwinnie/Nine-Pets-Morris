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

app.use(express.static(path.join(__dirname,'..', 'Application.css')));
app.get('/Application.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, '../Application.css'));
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../menu.html'));
});
app.get('/application.html', (req, res) => {
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
    const filePath = path.join(__dirname, '..','data.txt');

    boardStrings.forEach((boardString) => {
      fs.writeFileSync(path.join(__dirname, '..','data.txt'), boardString + '\n', { flag: 'a' });
      });
        console.log('Text file written successfully');
        res.send('Data saved successfully');
  }else {
    console.error('Received empty JSON data');
    res.status(400).send('Received empty JSON data');
  }
});


app.get('/load', (req, res) => {
  fs.readFile(path.join(__dirname,'..','data.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).send('Error loading game data');
    } else {
      const gameEntries = data.trim().split('\n');
      const gameList = [];
      let currentGame = { name: '', data: '' };
      for (const gameEntry of gameEntries) {
          if (gameEntry[0] !== '{') {
            // New game entry detected
            if (currentGame.name !== '' && currentGame.data !== '') {
              gameList.push(currentGame);
            }
            currentGame = { name: gameEntry.trim(), data: '' };
          } else {
            // Continue existing game entry
            currentGame.data = gameEntry;
          }
        }

        // Add the last game entry
        if (currentGame.name !== '' && currentGame.data !== '') {
          gameList.push(currentGame);
        }

        //res.json(gameList);     
        res.send(gameList);
      }
  });
});