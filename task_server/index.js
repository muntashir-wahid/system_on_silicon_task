const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6ayglwi.mongodb.net/dev_profile?retryWrites=true&w=majority`;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfuly"))
  .catch((err) => console.error(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Dev profile server is listening on port ${port}`);
});
