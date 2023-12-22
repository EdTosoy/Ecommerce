const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const validateMongoDbId = (id) => {
  const isValid = ObjectId.isValid(id);
  if (isValid == false) throw new Error("Invalid Id or Not Found");
};

module.exports = { validateMongoDbId };
