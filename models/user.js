const fs = require('fs')

const getUsersFromFile = async (cb) => {
  fs.readFile('./users.json', (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class User {
  constructor(id, login, password, age, isDeleted) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  save() {
    getUsersFromFile((users) => {
      if (this.id) {
        const existingUserIndex = users.findIndex(
          user => user.id === this.id
        );
        const updatedUsers = [...users];
        updatedUsers[existingUserIndex] = this;
        fs.writeFile('./users.json', JSON.stringify(updatedUsers), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString()
        users.push(this)
        fs.writeFile('./users.json', JSON.stringify(users), (err) => console.log(err))
      }
    })
  }

  static fetchAll(cb) {
    getUsersFromFile(cb);
  }

  static deleteById(id) {
    getUsersFromFile((users) => {
      const existingUserIndex = users.findIndex(
        user => user.id === id
      );
      const updatedUsers = [...users];
      updatedUsers[existingUserIndex] = { ...updatedUsers[existingUserIndex], isDeleted: true };
      fs.writeFile('./users.json', JSON.stringify(updatedUsers), err => {
        console.log(err);
      });
    })
  }
}