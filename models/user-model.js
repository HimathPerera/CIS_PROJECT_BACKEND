const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },
  mobile: { type: Number, required: true, minlength: 10, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  admin: { type: Boolean, required: true },
  isCompleted: { type: Boolean, required: true },
  date: { type: Date, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema);
