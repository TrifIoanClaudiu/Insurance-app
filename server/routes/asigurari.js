const router = require("express").Router();
const Asigurare = require("../models/Asigurare");

//Create
router.post("/create", async (req, res) => {
  const { formData } = req.body;

  const {
    name: fName,
    lastName: lName,
    insuranceType: type,
    userId,
  } = formData;

  const asigurare = {
    fName,
    lName,
    type,
    userId,
  };
  if (type === "RCA") {
    const { birthDate, marca, anFabricatie, nrInmatriculare } = formData;

    asigurare.dataNasterii = birthDate;
    asigurare.marca = marca;
    asigurare.anFabricatie = anFabricatie;
    asigurare.nrInmatriculare = nrInmatriculare;
  } else {
    const { serieSasiu, kilometrii } = formData;

    asigurare.serie = serieSasiu;
    asigurare.km = kilometrii;
  }

  const randomDdd = Math.floor(Math.random() * 900) + 100;
  const randomDd = Math.floor(Math.random() * 90) + 10;

  const prima = `${randomDdd}.${randomDd < 10 ? "0" : ""}${randomDd}`;
  asigurare.prima = prima;

  try {
    const newAsigurare = new Asigurare(asigurare);
    const savedAsigurare = await newAsigurare.save();
    res.status(200).json(savedAsigurare);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get by user

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    asigurari = await Asigurare.find({ userId: user_id });

    res.status(200).json(asigurari);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
