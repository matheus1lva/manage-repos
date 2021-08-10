#!/usr/bin/env node

const { Octokit } = require("@octokit/rest");
const { DELETE, ARCHIEVE } = require('./constants');

if (!process.env.ACCESS_CODE) {
	throw new Error('no access code found');
}

const octokit = new Octokit({
  auth: process.env.ACCESS_CODE,
});

async function processAction(response, repo, user) {
	if (response.action === DELETE) {
		try {
			await octokit.rest.repos.delete({
				owner: user,
				repo: repo,
			});
			console.log(`repository ${repo} deleted successfully`);
			return true;
		} catch (err) {
			console.log(err);
		}
	}

	return false;
}

async function run() {
	const { data } = await octokit.request("/user");
	const user = data.login;
	
	const repos = await octokit.rest.repos.listForAuthenticatedUser({
		affiliation: 'owner'
	});

	for (let i = 0; i < repos.data.length;i++) {
		const { name, html_url } = repos.data[i];
		const response = await inquirer.prompt({
			type: "list",
			name: "action",
			message: `What do you want to do with ${name}?`,
			choices: [
				{
					name: "Delete",
					value: DELETE,
				},
				{
					name: "Skip",
					value: "skip",
				}
			]
		})
		await processAction(response, name, user)
	}
}

run();

