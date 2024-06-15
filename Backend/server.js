const express = require('express');
const cors = require('cors'); 
const app = express();
app.use(cors()); 
const port = process.env.PORT || 3000;
app.use(express.json())

app.get('/', (req, res) => {
  res.send('IntelliFeed');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
