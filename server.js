const express = require('express');
const app = express();
const route = require('./routes/route')
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use('/api/v1', route)
// app.use('frontend')
const PORT = 5000 || process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
