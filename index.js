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
	'banana',
];

const run = async () => {
	try {
		console.log('START OF TRY');
		const token = core.getInput('github_token');
		const message = core.getInput('message');
		console.log(token, '<<< does this work?');
		const octokit = new github.getOctokit(token);

		// console.log(github.context, 'what is the context');
		console.log('GOT OCTOKIT AND GITHUB CONTEXT SHOULD BE ABOVE THIS');
		const { repo, payload } = github.context;
		const owner = payload.repository.owner.login;
		// const pull_number = payload.number;
		const pull_number = 32;
		const repoName = repo.repo;

		const { data: pullRequest } = await octokit.pulls.get({
			owner: 'melanierogan',
			repo: 'inclusivebot-workshop',
			pull_number: 32,
		});
		//this now works
		//TODO
		//Get files patch and use that as data for spliting down by those lines added
		//THEN try to get owner, repo and pull number put in dynamically
		//THEN tidy up messaging
		//THEN tidy up steps to recap

		console.log(pullRequest, 'the pull request <<<<<');
		const tryThis = await octokit.rest.pulls.listFiles({
			owner: 'melanierogan',
			repo: 'inclusivebot-workshop',
			pull_number: 32,
		});
		console.log(tryThis, 'WHAT HAPPENS HERE <<<<<<<');
		console.log('BODY SHOULD BE BELOW');
		let body = payload.pullRequests.body;
		console.log(body, '<<<< aint no body');

		// if (payload && payload.pull_request && payload.pull_request.body) {
		// 	// console.log(payload.pull_request, '<<< the pull request');
		// 	const extractBadWords = (ExtractedBadWordsArray, line) => {
		// 		for (const badWord of badWords) {
		// 			if (line.includes(badWord)) {
		// 				ExtractedBadWordsArray.push({
		// 					word: badWord,
		// 					line: line,
		// 					index: line.indexOf(badWord),
		// 					status: true,
		// 					count: ExtractedBadWordsArray.length,
		// 				});
		// 			}
		// 		}
		// 		return ExtractedBadWordsArray;
		// 	};
		// 	// console.log('START OF RESULT WITH REDUCE');
		// 	// const result = body.reduce(extractBadWords, []);

		// 	// const wordsFound = result.map(function(el) {
		// 	// 	return el.word;
		// 	// });

		// 	// const linesFound = result.map(function(el) {
		// 	// 	return el.line;
		// 	// });

		// 	// const isUnfriendlyComment = context.issue({
		// 	// 	body: `💔 This PR contains some non inclusive or unfriendly terms.
		// 	// 	The following words were found: ${wordsFound}
		// 	// 	These words were found on the following lines: ${linesFound}`,
		// 	// });

		// 	// if (result[0].status) {
		// 	// 	octokit.issues.createComment(isUnfriendlyComment);
		// 	// }
		// }

		return 'banana';
	} catch (error) {
		core.setFailed(error.message);
	}
};

run();
