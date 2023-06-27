import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { parse } from "csv-parse";

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "ok" });
});

app.get("/parse-expense", (req: Request, res: Response) => {
  const dirPath = path.join(__dirname, "files");

  const files = fs.readdirSync(dirPath);

  const fileName = files[0];
  const filePath = path.join(dirPath, fileName);

  const file = fs.createReadStream(filePath, { encoding: "utf-8" });

  console.log(file);

  const parser = parse({ delimiter: "," }, (err, records) => {
    console.log(records);
  });

  file.pipe(parser);
  res.json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`);
});
