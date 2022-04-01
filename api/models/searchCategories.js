const mongoose = require("mongoose");

const searchCategoriesSchema = new mongoose.Schema({
  technical: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  fundamental: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  general: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const SearchCategoriesModel = mongoose.model(
  "searchCategories",
  searchCategoriesSchema
);
module.exports = SearchCategoriesModel;
