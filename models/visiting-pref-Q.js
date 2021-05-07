const mongoose = require("mongoose");

const schema = mongoose.Schema;

const questionSchema = new schema({
  value: { type: Number, required: true },
});

module.exports = mongoose.model("visiting_pref", questionSchema);
