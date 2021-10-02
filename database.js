const mongoose = require('mongoose');

class Database {

  constructor(){
      this.connect();
  }

  connect(){
    mongoose.connect('mongodb+srv://Maiky:Test123*@cluster0.tajvz.mongodb.net/Energym', {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false,
      // useCreateIndex: true
    })
    .then(() => {
      console.log("Succesfully connected to the database");
    })
    .catch((err) => {
      console.log("The error is "+err);
    });
  }
}

module.exports = new Database();
