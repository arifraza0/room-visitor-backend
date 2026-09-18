const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

 mobile: {
  type: String,
  required: true,
  match: /^[0-9]{10}$/
},

    organization: {
      type: String
    },

    purpose: {
      type: String,
      required: true
    },

    personToMeet: {
      type: String
    },

    entryTime: {
      type: Date,
      default: Date.now
    },

    exitTime: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      default: "Inside"
    }
  },
  {
    timestamps: true
  }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;