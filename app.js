const express = require("express");
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/dist/planer/index.html"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "planer", "index.html"));
  });
}
const PORT = process.env.PORT;

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}
start();
