const { Int32 } = require("bson");
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, "Please enter your Category Name"],
    },
    category_description: {
      type: String,
      required: [true, "Please enter your Desc"],
    },
    image: {
      data:Buffer,
      ContentType: String
  }
  },
  { collection: "Category", timestamp: true }
);

module.exports = mongoose.model("Category", categorySchema);
