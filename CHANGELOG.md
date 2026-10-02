# Upcoming wekan.fi update

- Add a "Follow-up fixes (2026-10-02)" section to 25 existing Hall of Fame
  pages - AssignedBleed, VisibilityBleed, MetricsBleed, JamBleed, ReadOnlyBleed,
  FrameBleed, SignupBleed, LinkedWriteBleed, SubtaskDepositBleed, ParentBleed,
  HashBleed, MailTitleBleed, PositionHistoryBleed, UploadPathBleed,
  AvatarMimeBleed, OwnerBleed, ErrorBleed, MutationBleed, InvisibleBleed,
  BypassBleed, StaleBleed, HistoryScopeBleed, CacheBleed and RuleBleed - for the
  siblings and regressions closed after the 2026-10-02 review, each linking its
  source commit, with one sentence in the row's collapsed Details on the
  contents page. The CasRaceBleed page points to the new CasTokenBleed. Allow
  only these commit URLs on their own pages. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document RepointBleed, found while auditing board-owned rule and webhook
  documents: rule triggers, actions, rules and webhook integrations could be
  moved to another board by an admin of the board they were on, so a trigger set
  to every board mailed its owner the content of private boards. Record the
  board-change refusal, the custom-field and reaction siblings, the own-board
  rule matcher, Problems attribution and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/f02da1bfd2).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document PrototypeBleed, found while auditing per-user layout methods: the
  per-user layout methods wrote map[boardId][listId] with client ids, so a
  __proto__ board id let any signed-in user set a property on every object in
  the server until restart. Record the shared key check, Problems attribution
  and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/875a0065ed).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document BackgroundBleed, found while auditing board background downloads: the
  board background download served whatever attachment backgroundImageId named,
  and a board admin could set it to another board's attachment. Record the
  same-board check, the deny rule, the follow-up restoring the shared module,
  Problems attribution and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/146d58df27).
  [Follow-up restoring the shared background module](https://github.com/wekan/wekan/commit/f9d9596e2a).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document CodeBleed, found while auditing passwordless sign-in: passwordless
  sign-in codes were six hex characters valid for an hour, and only a
  per-connection limit stood between a spray of many connections and any
  account. Record the longer, shorter-lived code, why there is no Problems
  record, and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/611093e957).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document HookBleed, found while auditing outgoing board webhooks: the
  outgoingWebhooks method built its request from the caller's integration object
  and text, so any member could post as WeKan to the board's chat webhook or
  turn a one-way hook two-way. Record the stored-integration request, the
  card-opened-only client call, Problems attribution and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/047bde7546).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document ZipBombBleed, found while auditing zip imports: the Trello zip import
  read entry sizes from a field its entries do not have, so a small archive
  inflated without limit in server memory, and the zip import accepted members
  without write access. Record the bounded reader, the write check, why there is
  no Problems record, and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/e7ed71ee2e).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document CasTokenBleed, found while auditing the CAS login callback: the CAS
  callback stored a validated identity under a browser-chosen casToken, so a
  link sent to a victim signed in to CAS let the attacker log in as them. Record
  the cookie-bound state, the relation to CasRaceBleed, Problems attribution and
  verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/d3095fefd6).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document TrayBleed, found while auditing client-writable profile fields:
  profile.notifications fell under the client-writable profile rule, and a tray
  entry naming any activity made the notification publications send that card's
  content from any board. Record the read-state-only client write, Problems
  attribution and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/cd07d8db18).
  [Problems key and naming](https://github.com/wekan/wekan/commit/c15f9486d8).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document HookUrlBleed, found while auditing the board publication: the board
  publication sent integrations with their URLs to read-only members and
  public-board visitors, and a chat webhook URL carries its secret. Record the
  admin-only URLs, why there is no Problems record, and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/4af54face7).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document DirectoryInfoBleed, found while auditing publications sent before
  sign-in: the setting publication sent every visitor, before sign-in, the LDAP
  host, port, base DN, bind DN, filter and encryption mode. Record the
  admin-only fields, why there is no Problems record, and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/1b37bea1f0).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document MigrationBleed, found while auditing attachment migration methods:
  the attachment migration progress methods returned whole attachment documents,
  with storage paths, uploaders and names of files on cards the caller cannot
  see. Record the id-only answers, why there is no Problems record, and
  verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/a79e05223a).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document AuthMethodBleed, found while auditing user publications: the
  user-authenticationMethod publication gave any signed-in user any other user's
  organizations, teams and login method. Record the own-account-only answer, why
  there is no Problems record, and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/da394cf2ea).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document ArchiveBleed, found while auditing Sandstorm board import and clone:
  on Sandstorm, importBoard and cloneBoard archived whichever board the client
  named as currentBoard. Record the board-admin check, why there is no Problems
  record, and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/fb93c5f430).
  Allow only these source URLs on its page. Prepared locally; no website
  publication performed. Thanks to xet7.

- Document RelayBleed, found while auditing outbound requests: the live Trello
  import sent the importer's Trello key and token with downloads from any host,
  including renamed link attachments. Record the Trello-host-only credential,
  why there is no Problems record, and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/de67550476).
  Prepared locally; no website publication performed. Thanks to xet7.

- Document SyncBleed, reported privately by alham-rizvi in GHSA-5q84-p3vr-f3xv:
  List Sync fetched a board member's server address without the SSRF guard and
  echoed the start of failed responses. Record the guarded fetch, the
  save-time refusal, the administrator allow-list, the IPv6 gap the browser
  test found, Problems attribution and verification limits.
  [Source fix and regression tests](https://github.com/wekan/wekan/commit/2172f19d88).
  Allow only these reporter, advisory and source URLs on their pages. Prepared
  locally; no website publication performed. Thanks to alham-rizvi and xet7.

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
