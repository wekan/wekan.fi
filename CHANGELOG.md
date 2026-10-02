# Upcoming wekan.fi update

- Document CacheBleed, reported privately by alham-rizvi in GHSA-w3qg-pf27-g68r:
  attachments and avatars were sent with a public, one-year Cache-Control, so a
  shared cache could serve a private board's file without the access check.
  Record the three further places validation found, the private, revalidated
  policy for every board, why there is no Problems record, and verification
  limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/77c3957e5c).
  Allow only these reporter, advisory and source URLs on their pages. Prepared
  locally; no website publication performed. Thanks to alham-rizvi and xet7.

- Document ReplyBleed, reported privately by alex131125 in GHSA-mc7c-cv99-64h7:
  reply-by-email took the comment author from the reply's From address. Record
  that the endpoint was never registered in released versions, the
  per-recipient expiring reply address, the provider secret, Problems
  attribution and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/3151f8a81).
  Allow only these reporter, advisory and source URLs on their pages. Five Hall
  of Fame checks and the local deployment audit pass. Prepared locally; no
  website publication performed. Thanks to alex131125 and xet7.

- Unblock the Pages audit for the CopyIdentityBleed board-copy fix reference.
  Allow the exact reviewed commit URL only on its Hall of Fame page; altered
  URLs and use on other files still fail. Update the page regression to reflect
  completed board-copy validation. All 28 Python tests, four Hall of Fame
  checks and the local deployment audit pass. Hosted deployment was not run.
  Thanks to xet7.

- Record server card-copy destination validation and its limits on the
  CopyIdentityBleed page, distinguishing it from remaining source-access,
  client-template, board-property and concurrency review.
  [Destination fix and tests](https://github.com/wekan/wekan/commit/c35ba4b35).
  Allow this exact source link on that page. Prepared locally; no publication.
  Thanks to xet7.

- Document CopyIdentityBleed, reproduced and fixed during card-copy review,
  with text-only overrides, private-child isolation, Problems attribution and
  verification limits. Malformed text is not classified as an attack.
  [Source fix and tests](https://github.com/wekan/wekan/commit/1e44a1ffc).
  Add eight-column Hall of Fame coverage and exact source/document URL allowances.
  Prepared locally; no website publication performed. Thanks to xet7.

- Document AdminFieldBleed, reported privately by Hama1cco, with server read,
  mutation and export boundaries, runtime summaries and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/89a65ee7c).
  Record the SAML response-property compatibility correction and real local
  signed-popup tests on the SamlReplayBleed page.
  [SAML compatibility fix](https://github.com/wekan/wekan/commit/3578e3ef8).
  Allow only these reviewed reporter/source/document URLs on their specific
  Hall of Fame pages. Prepared locally; no website publication performed.
  Thanks to Hama1cco and xet7.

- [Unblock Pages checks for reviewed Hall of Fame references](https://github.com/wekan/wekan.fi/commit/276468b).
  The deployment audit rejected source-fix, audit-document and reporter links
  on the authentication, export and History pages. Allow those exact links
  only on the affected pages; unrelated URLs and suspicious indicators still
  fail. All 30 risk, mocked-release and Hall of Fame checks pass, as does the
  local deployment audit. Hosted deployment was not run. Thanks to xet7.

- Document LdapBindBleed, DirectoryGroupBleed and SamlReplayBleed in the Hall
  of Fame, including deployment conditions, verification and runtime reporting.
  Credit kta1kri for GHSA-m87f-f43w-hwmc and xet7 for the sibling audit.
  [Source fixes and regression tests](https://github.com/wekan/wekan/commit/679a8b349).
  Prepared locally for the Upcoming release; no website publication performed.
  Thanks to kta1kri and xet7.

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
