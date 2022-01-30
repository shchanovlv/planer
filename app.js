const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ extened: true }));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "dist", "planer")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "planer", "index.html"));
  });
}
const PORT = process.env.PORT;

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(
        `App has been started on port ${PORT} NODE_ENV=${process.env.NODE_ENV}...`
      )
    );
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}
start();
