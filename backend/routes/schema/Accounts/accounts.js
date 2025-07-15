const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    verify_otp: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    forgot_password: { type: Number, default: null },
    role: { type: String, default: "user" }, // 'user' or 'admin'
  },
  { timestamps: true, discriminatorKey: "kind" },
);

const AccountCreation = mongoose.model("Account", AccountSchema);

module.exports = { AccountCreation };
