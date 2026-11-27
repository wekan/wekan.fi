'use strict';
// The v13.34 deploy (run 45882142858) uploaded github-pages-1 and then failed
// with "No artifacts named github-pages-1 were found": GitHub's artifact list
// lagged behind the upload. The deploy now waits and tries the same artifact
// once more, and a failure of that second try still fails the job.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const wf = fs.readFileSync(path.join(__dirname, '..', '.github/workflows/static.yml'), 'utf8');
const steps = wf.split(/\n      - /).slice(1);
const deploys = steps.filter(s => s.startsWith('uses: actions/deploy-pages@'));

test('a failed first deploy is retried with the same artifact after a wait', () => {
  assert.equal(deploys.length, 2, 'one deploy and one retry');
  const [first, retry] = deploys;
  assert.match(first, /id: deployment\n/);
  assert.match(first, /continue-on-error: true/);
  assert.match(retry, /id: deployment_retry\n/);
  assert.match(retry, /steps\.deployment\.outcome == 'failure'/);
  const artifact = s => s.match(/artifact_name: (.+)/)[1];
  assert.equal(artifact(first), artifact(retry));
  const upload = steps.find(s => s.startsWith('uses: actions/upload-pages-artifact@'));
  assert.equal(upload.match(/name: (.+)/)[1], artifact(first), 'deploys the artifact that was uploaded');
  const wait = steps[steps.indexOf(retry) - 1];
  assert.match(wait, /steps\.deployment\.outcome == 'failure'/);
  assert.match(wait, /run: sleep [1-9][0-9]*/);
});

test('negative: the retry cannot hide a failed deploy, and a good deploy is not repeated', () => {
  const retry = deploys[1];
  assert.doesNotMatch(retry, /continue-on-error/, 'a second failure fails the job');
  assert.match(retry, /steps\.plan\.outputs\.deploy == 'true'/, 'no deploy when the plan skips it');
  assert.match(wf, /url: \$\{\{ steps\.deployment\.outputs\.page_url \|\| steps\.deployment_retry\.outputs\.page_url \}\}/);
});
