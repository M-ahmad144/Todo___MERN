const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
    trim: true,
    unique: true,
  },
});

tagSchema.index({ name: 1 });

module.exports = mongoose.model("Tag", tagSchema);
