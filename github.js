const { Octokit }  = require("@octokit/rest");


const octokit = new Octokit({
   userAgent: 'slack bot v1.0.0',
   baseUrl: 'https://api.github.com',
   timeZone: 'America/Chicago'
})

async function getRepoIssues(githubId, repository)
{
   return await octokit.rest.issues.listForRepo({
      owner: githubId,
      repo: repository,
   }).then((issues) => {
      return (issues.data)
   }).then((data) => {
      return createIssueBlock(data)
   })
}

function createIssueBlock(issuesList)
{
   let slackBlock = require('./block_templates/listIssues.json')

   for (let index = 0; index < issuesList.length; index++) {
      let newElement = require('./block_templates/issueElement.json')
      let issue = issuesList[index]

      // Custommize the issue element
      newElement.text.text     = `*${issue.title}*\n _${issue.body.substr(0, 30)}..._`
      newElement.accessory.url = issue.url

      //append to slack block
      slackBlock.blocks.push(newElement)
   }

   // return slack block for rendering
   return slackBlock
}

module.exports = {
   getRepoIssues,
   createIssueBlock
}