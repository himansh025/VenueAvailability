const express = require("express");
const path = require("path");
const { spawn } = require("child_process");
const uploadMiddleware = require("../auth/m_fileUpload");

const router = express.Router();

// Upload route with middleware
router.post("/", uploadMiddleware, (req, res) => {
  if (!req.file) {
    console.log("400 bad request . file nahi aayi");
    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file type." });
  }

  // Get the filename from the uploaded file
  const filePath = req.file.filename;
  const pythonScript = path.join(__dirname, "../", "controllers", "Extractor.py");

  // Spawn the Python process
  const pythonProcess = spawn('python', [pythonScript, filePath]);

  // Capture the output from the Python script
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  // Capture any errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Handle the exit of the Python process
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      // If Python script finishes successfully
      res.status(200).json({
        message: "File uploaded and Python script executed successfully!",
        file: req.file.filename,
      });
    } else {
      // If Python script fails with an error code
      res.status(500).json({ error: `Python script failed with exit code ${code}` });
    }
  });

  // Handle any errors when starting the Python process
  pythonProcess.on('error', (err) => {
    console.error("Failed to start Python process:", err);
    res.status(500).json({ error: "Failed to run Python script" });
  });
});

module.exports = router;
