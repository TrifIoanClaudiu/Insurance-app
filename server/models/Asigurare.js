const mongoose = require("mongoose");

const asigurareSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    dataNasterii: { type: Date },
    marca: { type: String },
    anFabricatie: { type: String },
    nrInmatriculare: { type: String },
    serie: { type: String },
    km: { type: Number },
    prima: {
      type: String,
      match: /^\d{3}\.\d{2}$/, // Verifică dacă valoarea se potrivește cu formatul (ddd.dd)
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asigurare", asigurareSchema);
