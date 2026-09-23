# Upcoming wekan.fi update

- [Distinguish known dependency keyword false positives from new findings](https://github.com/wekan/wekan.fi/commit/289eee79914c0ab69e77039ead838980111f1f9f).
  Documented exact matches are informational; new or changed matches warn.
  Independent risk gates stay active. Current metadata needs no exemptions.
  Positive and negative tests and offline audits pass. Thanks to xet7.

- [Fix Windows release source paths and allow scoped version links](https://github.com/wekan/wekan.fi/commit/5f1aeb10f4e782d91de09d9b2a72970b0e065ad2).
  Allow only Node 26 version-directory links at the existing download hosts
  on the install page. Other URLs remain checked. Use shell-relative paths
  in the shared Windows resolver. Offline positive and negative tests pass;
  no hosted publication or Windows build was run. Thanks to xet7.

- [Accept valid GitHub SSH origins in release launchers](https://github.com/wekan/wekan.fi/commit/456498570429a54b9f8e6837908cc2d2bed6759f).
  Accept HTTPS and both SSH URL forms with or without .git, while rejecting
  incorrect repositories and lookalike hosts. Record the existing Node
  v26.10.0 download link in the URL baseline. Offline positive and negative
  tests and source audits pass; no hosted release was run. Thanks to xet7.

- [Add release menus and automated dependency checks](https://github.com/wekan/wekan.fi/commit/c28afbb).
  Shell and Windows launchers prepare numbered website releases, commit pending
  files, push and dispatch shared Pages workflows. Release All Missing retains
  the version and checks whether the exact commit is already deployed. Hash
  drift only warns; known hashes, new suspicious keywords and new URLs stop
  checks without requiring AI approval. Offline release/indicator tests and
  workflow syntax checks pass; hosted deployment and Windows execution were
  not run. Thanks to xet7.

- [Update install page for Node.js 26 and npm 12](https://github.com/wekan/wekan.fi/commit/3690115). The active install page and version list now show Node.js 26.9.0, npm 12.0.2 and Meteor 3.6-beta.1. Thanks to xet7.
