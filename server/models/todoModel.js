const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,

      trim: true,
      required: [true, "Please add a title"],
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium", // Default priority
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag", // Reference to the Tag model
      required: [true, "Tag is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "today", "overdue", "completed"],
      default: "pending", // Default status
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
todoSchema.index({ title: 1 });

module.exports = mongoose.model("Todo", todoSchema);
