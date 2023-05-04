const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRoutes = require("./api/routes/users");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
