const { Octokit } = require("@octokit/core");
const dotenv = require("dotenv").config();

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});

const express = require("express");
const app = express();
const port = 3003;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// Rest of the code...
app.post("/update-file-skills", async (req, res) => {
  const { content } = req.body;
  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const contactPath = "skills.js";
  const message = "Updating file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };
  try {
    if (content) {
      // Fetch the file SHA
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/utils/data/{path}",
        {
          owner,
          repo,
          path: contactPath,
        }
      );

      const sha = response.data.sha;

      // Update the file
      const updateResponse = await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/utils/data/{path}",
        {
          owner,
          repo,
          path: contactPath,
          message,
          content: Buffer.from(content).toString("base64"),
          branch,
          sha,
          committer,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28", // Specify the API version
          },
        }
      );
      res.send(`File updated successfully! File path: ${contactPath}`);
    } else {
      res.status(400).send("Content cannot be empty");
    }
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});
app.post("/update-file-contact", async (req, res) => {
  const { content } = req.body;
  const owner = "kolinabir";
  const repo = "developer-portfolio-main";
  const contactPath = "contactsData.js";
  const message = "Updating file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };
  try {
    if (content) {
      // Fetch the file SHA
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/utils/data/{path}",
        {
          owner,
          repo,
          path: contactPath,
        }
      );

      const sha = response.data.sha;

      // Update the file
      const updateResponse = await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/utils/data/{path}",
        {
          owner,
          repo,
          path: contactPath,
          message,
          content: Buffer.from(content).toString("base64"),
          branch,
          sha,
          committer,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28", // Specify the API version
          },
        }
      );
      res.send(`File updated successfully! File path: ${contactPath}`);
    } else {
      res.status(400).send("Content cannot be empty");
    }
  } catch (error) {
    console.error("Error updating file:", error.message);
    res.status(500).send("Error updating file");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
