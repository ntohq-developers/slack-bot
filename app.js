// Import Node Librarys
const { App } = require("@slack/bolt")
const { Octokit } = require("@octokit/rest");
// dotenv setup
require("dotenv").config()

const octokit = new Octokit({
   userAgent: 'slack bot v1.0.0',
   baseUrl: 'https://api.github.com',
   timeZone: 'America/Chicago'
})

// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET,
   port: process.env.PORT
});



// The echo command simply echoes on command
app.command('/issue', async ({ command, ack, respond }) => {
   // Acknowledge command request
   await ack();
   await octokit.rest.issues.listForRepo({
      owner: 'sergix',
      repo: command.text,
   }).then((issues) => {
      return issues.data[0].url
   }).then((data) => {
      respond(data);
   })
});

app.command('/test', async ({ command, ack, respond }) => {
   await ack().then(() => {
      return command.text.split()
   }).then((args) => {
      respond(args[0])
   })
});

(async () => {
   // Start your app
   await app.start();
   console.log(`⚡️ Slack Bolt app is running!`);
})();