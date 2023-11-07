import mongoose from "mongoose";

// subschema to store array of gameRecords
const gameRecord = new mongoose.Schema({
  // game info
  gameId: { type: String, required: true },
  time: { type: Date, required: true },
  win: { type: Boolean, required: true }, // did self win against opponent

  // opponent info
  opponent: { type: opponentUserSchema, required: true },
});

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true },
  level: { type: Number, required: true },
  exp: { type: Number, required: true },
  profilePicture: String,
  // user game stats
  numOfRoundsPlayed: { type: Number, required: true },
  numOfRoundsWon: { type: Number, required: true },
  // battle records
  records: { type: [gameRecord], required: true },
});

const opponentUserSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, required: true },
  level: Number,
  profilePicture: String,
});

export default mongoose.model("User", userSchema);
