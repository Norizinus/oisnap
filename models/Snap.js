const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const snapSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: {
      type: String,
      enum: ["free", "crowd", "happening", "promo"]
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: Object,
    address: String,

    image: String,
    expireAt: { type: Date, default: undefined }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

snapSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Snap = mongoose.model("Snap", snapSchema);

module.exports = Snap;
