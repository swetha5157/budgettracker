const app = require("./app");
const db = require('./config/db');
const port = 3002;

app.get('/', (req, res) => {
    res.send('Hello API!');
  });

app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
});