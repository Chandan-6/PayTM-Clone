import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
});

const accountSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});


const User = model("User", userSchema);
const Account = model("Account", accountSchema);
export { User, Account };
