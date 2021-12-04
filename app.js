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
   let repoIssues = await octokit.rest.issues.listEventsForRepo({
      owner: 'sergix',
      repo:  command.text,
    });
   await respond(repoIssues);
 });
 
app.command('/get update')


(async () => {
   // Start your app
   await app.start();
   console.log(`⚡️ Slack Bolt app is running!`);
})();