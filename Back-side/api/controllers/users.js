const fs = require("fs");
const path = require("path");
const usersData = require("../../data/users.json");

function writeToFile(data, callback) {
  fs.writeFile(path.join(__dirname, "../../data/users.json"), JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    callback();
  });
}

exports.getUsers = (req, res) => {
  res.status(200).json(usersData);
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const user = usersData.find((user) => user.id === parseInt(userId));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.createUser = (req, res) => {
  const newUser = {
    id: usersData.length + 1,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
  };
  usersData.unshift(newUser); // add new user at the beginning of the array
  writeToFile(usersData, () => {
    res.status(201).json(newUser);
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = usersData.findIndex((user) => user.id === parseInt(userId));

  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
  } else {
    console.log(userIndex, "user index");
    const updatedUser = {
      id: parseInt(userId),
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
      phone: req.body.phone,
    };
    usersData[userIndex] = updatedUser;
    writeToFile(usersData, () => {
      res.status(200).json(updatedUser);
    });
  }
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = usersData.findIndex((user) => user.id === parseInt(userId));
  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
  } else {
    usersData.splice(userIndex, 1);
    writeToFile(usersData, () => {
      res.status(200).json({ message: "User deleted successfully" });
    });
  }
};
