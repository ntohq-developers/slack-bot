const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
   userAgent: 'slack bot v1.0.0',
   baseUrl: 'https://api.github.com',
   timeZone: 'America/Chicago'
})

async function test()
{
   return await octokit.rest.issues.listForRepo({
      owner: 'sergix',
      repo: 'analyst',
   }).then((issues) => {
      return (issues.data[0].url)
   })
}

test().then((data) => {
   console.log(data)
})