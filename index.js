const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: "",
});

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.send("Received data");
});

app.post("/create-file", async (req, res) => {
  const { name, content } = req.body;
  const owner = "kolinabir";
  const repo = "Testing-GIT-API";
  const path = name;
  const message = "Creating new file";
  const branch = "main"; // Specify the branch
  const committer = {
    name: "Monalisa Octocat", // Specify the committer name
    email: "octocat@github.com", // Specify the committer email
  };

  try {
    if (content) {
      const response = await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path,
          message,
          content: Buffer.from(content).toString("base64"),
          branch,
          committer,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28", // Specify the API version
          },
        }
      );
      res.send(`File created successfully! File path: ${path}`);
    } else {
      res.status(400).send("Content cannot be empty");
    }
  } catch (error) {
    console.error("Error creating file:", error.message);
    res.status(500).send("Error creating file");
  }
});

app.post("/update-file", async (req, res) => {
  const { name, content } = req.body;
  const owner = "kolinabir";
  const repo = " developer-portfolio-main";
  const path = name;
  const message = "Updating file";
  const branch = "main";
  const committer = {
    name: "Kolinabir",
    email: "knkolin9@gmail.com",
  };

  try {
    if (content) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path,
        }
      );

      const sha = response.data.sha;

      const updateResponse = await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path,
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
      res.send(`File updated successfully! File path: ${path}`);
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
