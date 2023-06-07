import express from "express";
import { modifyPdf } from "./src/modifyPdf.js";
import { generateDatesFrom } from "./src/dates.js";

const app = express();

app.get("/", async (req, res) => {
  const startDate = req.query.startDate;
  const dates = generateDatesFrom(startDate);
  for (const date of dates) {
    await modifyPdf(date);
  }
  res.send("¡Carátulas listas!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});