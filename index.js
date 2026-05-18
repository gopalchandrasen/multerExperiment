const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 3000;
// const fs = require("./uploads");

app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "./uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const uploadWithStorage = multer({ storage: storage });

app.get("/", (req, res) => {
  console.log("Route hit");
  return res.render("homepage");
});

// app.post("/uplaod", (req, res) => {
//   console.log("File uploaded");

// });

app.post(
  "/upload",
  uploadWithStorage.single("file"),
  function (req, res, next) {
    console.log("File uploaded");
    console.log(req.file);
    return res.redirect("/");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
