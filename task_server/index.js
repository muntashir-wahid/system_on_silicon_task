const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server side!");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6ayglwi.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("dev_profile");
    const usersCollection = database.collection("users");

    // Create user
    app.post("/api/v1/users", async (req, res) => {
      const user = req.body;

      const existigUser = await usersCollection.findOne({ email: user.email });

      if (existigUser) {
        return res.status(400).json({
          status: "fail",
          message: "User already exist",
        });
      }

      const resule = await usersCollection.insertOne(user);

      user._id = resule.insertedId;

      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    });

    // Get a user

    app.get("/api/v1/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };

      const user = await usersCollection.findOne(query);

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    });

    // User login

    app.get("/api/v1/users", async (req, res) => {
      const { email } = req.query;
      const password = req.headers.password;

      const filter = { email: email, password: password };

      const user = await usersCollection.findOne(filter);

      if (!user) {
        return res.json({
          status: "fail",
          message: "Email and password dosen't match",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
