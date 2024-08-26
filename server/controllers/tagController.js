const catchAsync = require("../utils/catchAsync");
const Tag = require("../models/TagModel");

exports.getTags = catchAsync(async (req, res, next) => {
  const tags = await Tag.find();

  res.status(200).json({
    status: "success",
    data: {
      tags,
    },
  });
});
