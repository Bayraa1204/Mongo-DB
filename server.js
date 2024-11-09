const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
app.use(express.json());

const client = new MongoClient(
  "mongodb+srv://Bayraa:R*b4sdHJzFze5Nr@first.0zqdv.mongodb.net/?retryWrites=true&w=majority&appName=first"
);
let db;
const connectToDb = () => {
  try {
    client.connect();
    db = client.db("sample_mflix");
    console.log("connected to DB");
  } catch (error) {
    console.log(error, "failed to connect DB");
  }
};

connectToDb();

app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.status(200).send(users);
});

app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const respon = await db.collection("users").insertOne({ user });
    res.send(respon);
  } catch (error) {
    res.send(`error => ${error}`);
  }
});

app.put("/users", async (req, res) => {
  try {
    const { name, id, email } = req.body;
    await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          email,
        },
      }
    );
    res.send("done");
  } catch (error) {
    console.log(`error => ${error}`);
    res.send("failed to update user");
  }
});

app.delete("/users", async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    res.send("deleted");
  } catch (error) {
    console.log(`error => ${error}`);
    res.send("failed to Delete");
  }
});

app.listen(8080, console.log("your server is now running on server 8080"));
