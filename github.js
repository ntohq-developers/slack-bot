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
   })
}

module.exports = { getRepoIssues };