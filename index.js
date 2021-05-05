const core = require('@actions/core');
const github = require('@actions/github');
const unfriendlyWords = [
	'whitelist',
	'blacklist',
	'simply',
	'master',
	'slave',
	'just',
	'guys',
	'obviously',
	'sane',
];

try {
	const token = core.getInput('github_token');
	const message = core.getInput('message');
	const octokit = new github.GitHub(token);
	const { repo, payload } = github.context;
	let body;

	if (payload && payload.pull_request && payload.pull_request.body) {
		console.log(payload.pull_request, '<<< the pull request');
		console.log(payload.pull_request.body, '<<< the pull request body');

		if (body !== payload.issue.body) {
			octokit.issues
				.createComment({
					owner: repo.owner,
					repo: repo.repo,
					issue_number: payload.issue.number,
					body: message,
				})
				.catch(e => {
					throw e;
				});
		}
	}
} catch (error) {
	core.setFailed(error.message);
}
