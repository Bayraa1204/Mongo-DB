const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
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

const passwordMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await db.collection("users").findOne({ email });
  const isValidPass = bcrypt.compareSync(password, user.password);
  if (isValidPass) {
    next();
  } else {
    res.send("password or email is incorrect");
  }
};
const hashPasswordMiddleWare = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    next();
  } else {
    res.send("{message: password was not found}");
  }
};

const userSignup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = {
      name,
      email,
      password,
    };
    const response = await db.collection("users").insertOne(user);
    res.send(response);
  } catch (error) {
    res.send(`Failed to create User`);
  }
};

const userLogin = async (req, res) => {
  res.send(`successfully logged in`);
};

const userEdit = async (req, res) => {
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
};

const userDelete = async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    res.send("deleted");
  } catch (error) {
    console.log(`error => ${error}`);
    res.send("failed to Delete");
  }
};

const getUsers = async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.status(200).send(users);
};

module.exports.userSignup = userSignup;
module.exports.userLogin = userLogin;
module.exports.userEdit = userEdit;
module.exports.getUsers = getUsers;
module.exports.userDelete = userDelete;
module.exports.passwordMiddleware = passwordMiddleware;
module.exports.hashPasswordMiddleWare = hashPasswordMiddleWare;
