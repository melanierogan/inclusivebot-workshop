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
	console.log(token, '<<< does this work?');
	const octokit = github.getOctokit(token);
	const { repo, payload } = github.context;
	let body;

	if (payload && payload.pull_request && payload.pull_request.body) {
		console.log(payload.pull_request, '<<< the pull request');
		console.log(payload.pull_request.body, '<<< the pull request body');
		const checkCommit = body;
		const extractBadWords = (ExtractedBadWordsArray, line) => {
			for (const badWord of badWords) {
				if (line.includes(badWord)) {
					ExtractedBadWordsArray.push({
						word: badWord,
						line: line,
						index: line.indexOf(badWord),
						status: true,
						count: ExtractedBadWordsArray.length,
					});
				}
			}
			return ExtractedBadWordsArray;
		};

		const result = body.reduce(extractBadWords, []);

		const wordsFound = result.map(function(el) {
			return el.word;
		});

		const linesFound = result.map(function(el) {
			return el.line;
		});

		const isUnfriendlyComment = context.issue({
			body: `💔 This PR contains some non inclusive or unfriendly terms.
			The following words were found: ${wordsFound}
			These words were found on the following lines: ${linesFound}`,
		});

		if (result[0].status) {
			octokit.issues.createComment(isUnfriendlyComment).catch(e => {
				throw e;
			});
		}
	}
} catch (error) {
	core.setFailed(error.message);
}
