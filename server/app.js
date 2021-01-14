require("dotenv").config();
const express = require("express");
const router = require("./routers");
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(router);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Develpment on port ${PORT}`));