const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
    trim: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
