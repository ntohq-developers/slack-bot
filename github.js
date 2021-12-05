const { Octokit }  = require("@octokit/rest");

const octokit = new Octokit({
   userAgent: 'slack bot v1.0.0',
   baseUrl: 'https://api.github.com',
   timeZone: 'America/Chicago'
})

async function getReposIssues(githubId, repository)
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
   const elementTemplate = JSON.stringify(require('./block_templates/issues/issueElement.json'))
   let slackBlock = JSON.parse(JSON.stringify(require('./block_templates/issues/listIssues.json')))

   for (let index = 0; index < issuesList.length; index++) {
      // Make a copy of the element template
      const newElement = JSON.parse(elementTemplate);

      // Custommize the issue element
      newElement.text.text     = `*${issuesList[index].title}*..._`
      newElement.accessory.url = issuesList[index].html_url

      //append to slack block
      slackBlock.blocks.push(newElement)
   }

   // return slack block for rendering
   return slackBlock
}

module.exports = {
   getReposIssues,
   createIssueBlock
}
