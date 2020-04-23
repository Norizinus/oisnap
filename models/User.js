const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    nickname: String,
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    snaps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snap" }],
    snapCount: {
      free: { type: Number, default: 0 },
      promo: { type: Number, default: 0 },
      crowd: { type: Number, default: 0 },
      happening: { type: Number, default: 0 }
    },
    vote_count: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    image: String,
    role: {
      type: String,
      default: "user",
      enum: ["moderator", "user"]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

/* nickname: String,
username: String,
password: String,
snaps: [Obj.ref],

snap_count: 
{ free: 0,
promo: 0,
crowd: 0,
happening: 0}

vote_count: Number,
score: Number,
image: String,
role: enum [] 
 */
