import mongoose from "mongoose";

const itemsSchema =  new mongoose.Schema(
  {
    name: {type: String, required: true},
    content: {type: String, require: true}
  },
  {
    timestamps: true
  }
)

const Items = mongoose.models.Items || mongoose.model("Items", itemsSchema)

export default Items