import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: String } }],
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  },
  { timestamps: true }
);

const URL:any = mongoose.model("urls", urlSchema);
export default URL;