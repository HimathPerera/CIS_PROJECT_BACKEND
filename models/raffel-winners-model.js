const mongoose = require("mongoose");

const schema = mongoose.Schema;

const raffelSchema = new schema({
  month: { type: Number, required: true },
  raffelStatus: { type: Boolean, required: true },
  winner: { type: String, required: true },
});

module.exports = mongoose.model("Raffel", raffelSchema);
