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
  res.sendFile(path.join(__dirname, '../Application.html'));
});
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../menu.html'));
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

  const gameIndex = Number(req.query.gameIndex);
  if (req.body) {
    const boardStrings = req.body.split('\n');
    const filePath = path.join(__dirname, '..','data.txt');

    const gameData = fs.readFileSync(filePath, 'utf8');
    const gameEntries = gameData.trim().split('\n');

    if (gameIndex == -1) {
      boardStrings.forEach((boardString) => {
        fs.writeFileSync(path.join(__dirname, '..','data.txt'), boardString + '\n', { flag: 'a' });
        });
      console.log('Text file written successfully');
      res.send('Data saved successfully');
    } else if (gameIndex >= 0) {
      gameEntries[gameIndex] = boardStrings.join('\n');
      fs.writeFileSync(filePath, gameEntries.join('\n'));
      console.log('Text file updated successfully');
      res.send('Data saved successfully');
    } else {
      console.error('Received empty or invalid JSON data or gameIndex');
      res.status(400).send('Received empty or invalid JSON data or gameIndex');
    }
  } else {
    console.error('Received empty or invalid JSON data or gameIndex');
    res.status(400).send('Received empty or invalid JSON data or gameIndex');
  }
});






app.get('/load', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data.txt');

  fs.access(filePath, fs.constants.F_OK, (err) =>{
    if (err) {
      console.error('Data file does not exist:', filePath);
      res.status(200).send([]);
    } else {
      fs.readFile(filePath, 'utf8', (err, data) => {
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
                currentGame.data += '\r'
                currentGame.data += gameEntry;
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
    }
  });
});