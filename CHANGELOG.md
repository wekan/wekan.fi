# Upcoming wekan.fi release

- Deploy: the v13.08, v13.09 and v13.10 API pages stopped the deploy in its
  source audit, because they load Redoc v3.1.0 from cdn.redocly.com and only
  the v3.0.1 bundle was an allowed URL. The WeKan API generator renders with
  @redocly/cli@latest, so the pinned Redoc changes when Redocly releases, and
  an exact URL would stop a deploy again at the next bump. The audit now also
  takes URL patterns scoped by a path glob (allowUrlPatternsByPath, matched one
  path segment at a time), and api/v*/index.html allows an exact-version
  cdn.redocly.com Redoc standalone bundle and nothing else.
  tests/riskAudit.test.py refuses other hosts, files, deeper pages, query
  strings and a "latest" bundle, and fails with the old audit. Thanks to xet7.

- Hall of Fame: ListLockBleed, reported by tsurutanmen through
  [GHSA-4734-8vrg-8j3w](https://github.com/wekan/wekan/security/advisories/GHSA-4734-8vrg-8j3w):
  a list that refused a role write access (#4527) did not refuse that role's
  checklist and checklist-item REST writes. Its reporter, advisory and fix
  commit links are allowed as exact URLs on its page, and the advisory on the
  index, in releases/risk-baseline.json; tests/riskAudit.test.py pins them.
  Thanks to tsurutanmen and xet7.

- Deploy: the UnassignedArchiveBleed Hall of Fame commit stopped the deploy in
  its source audit, because the new page's GitHub links - the reporter
  tsurutanmen, GHSA-6xqf-jh8x-4wxc and the fix commit 1513b2e98c - were not in
  releases/risk-baseline.json. They are now allowed as exact URLs on that page
  and the advisory on the index only. tests/riskAudit.test.py pins the exact
  URLs, refuses them in code, on another page and as near misses. Thanks to
  xet7.

- Hall of Fame: CreateBleed, reported by tsurutanmen through
  [GHSA-qcfm-2g4w-wqcc](https://github.com/wekan/wekan/security/advisories/GHSA-qcfm-2g4w-wqcc):
  "Only admins can create boards" was checked only by the Add Board form, so
  a user who is not an admin still created boards from the browser console,
  the REST API, imports, copies, clones and cards. A row on the index with 5
  stars, its own page, the Audit-Stars.md entry, and the page's GitHub links
  allowed as exact URLs in releases/risk-baseline.json, pinned by
  tests/riskAudit.test.py. Thanks to tsurutanmen and xet7.

- Deploy: the GroupLinkBleed Hall of Fame commit stopped the deploy in its
  source audit, because the new page's GitHub links - the reporter bhaswanthc,
  GHSA-v544-rmr5-38gx and the fix commit - were not in
  releases/risk-baseline.json. They are now allowed as exact URLs on those two
  pages only. The fix link pointed at 87c4501ced, a pre-rebase hash that is not
  on wekan/wekan main; it now points at e3458004ec, the commit the WeKan
  changelog links. tests/riskAudit.test.py pins the exact URLs, refuses them
  in code and refuses near misses, and fails with the old baseline. The API
  pages of v12.95, v12.96 and v12.97 spelled the name Wekan in their title and
  description again, because the WeKan API generator still did; they say WeKan
  and tests/brand-spelling.test.cjs passes.
  [The WeKan API generator is fixed](https://github.com/wekan/wekan/commit/4d5fe63fc4)
  too, so the API pages of the next releases say WeKan from the start. Thanks
  to xet7.

- The name is WeKan in the visible text of every page: 2,695 lines on 573 pages -
  the API documentation of every version (api/), the Hall of Fame pages and the
  Standard for Public Code page - had Wekan, WEKAN or wekan. Addresses, file
  names, class names and code keep their own spelling (wekan.fi,
  github.com/wekan/wekan, snap install wekan). The API pages are Redoc pages
  that rebuild their text in the browser from the JSON in __redoc_state, so
  that JSON says WeKan too (it was checked to parse before and after), and the
  search index in it, which is lower case on purpose, is untouched. The
  reporters' quoted words in the Hall of Fame follow the same spelling.
  tests/brand-spelling.test.cjs checks all 647 pages, the Redoc state, and that
  an address, a path or a code block is not mistaken for the name; it fails on
  the pages before this change (4,768 places). Thanks to xet7.

- Terms of Service: /terms/ is built on the same page template and top menu as
  the other pages (it was a stand-alone page with its own styles and no menu),
  and every page that has a Privacy Policy item in its top menu - the 13 others
  - has Terms of Service just to the left of it, linking /terms/ with the path
  right for the page's depth. The Docs "Other links", the SaaS page and the App
  page link it beside their Privacy Policy links. tests/terms-menu.test.cjs
  checks the menu of every page, that there is exactly one Terms item in each,
  and that /terms/ has the same head, header and footer as /privacy/. Thanks to
  xet7.

# v1 2026-11-02 wekan.fi release

- Hall of Fame: ImportPlacementBleed is credited as the GitHub security
  advisory it was reported through,
  [GHSA-pm7j-752h-qfvj](https://github.com/wekan/wekan/security/advisories/GHSA-pm7j-752h-qfvj),
  with five stars, its reporter zachariah-mithani linked, the CVE requested
  through the advisory and the fix released in v12.69 - on the index and on its
  own page. The release audit allows the advisory and the reporter's profile on
  those two pages only. Thanks to zachariah-mithani and xet7.

- Hall of Fame: the text below the CVE table has the table's margins, 5% of
  the page on each side, instead of running from edge to edge. The margin is on
  each block directly in the page body and nothing nested adds to it, so a page
  with several .hof blocks (AssignedBleed and others) gets it once, and the nine
  tables that were full width have the same margins as the rest. Checked in
  Chromium on all 139 pages at 1400, 800 and 400px. Thanks to xet7.

- Link Sandstorm at sandstorm.org: the SaaS page's Sandstorm security
  practices and the success page's App Market link use docs.sandstorm.org and
  apps.sandstorm.org, and the release audit allows those URLs on those pages
  instead of the sandstorm.io ones. Thanks to xet7.

- Hall of Fame: every Vulnerability name in the index links to its own page,
  with a relative URL - 136 of 141 had no link; CasRaceBleed and
  CasAccountMergeBleed share casbleed/, FileNameBleed and FilePathBleed
  filebleed/, MimeStorageBleed mimebleed/. Every Hall of Fame page is aligned
  the same way: centered above the CVE table, the table and everything below it
  left aligned with each cell's content at its top. The 31 pages that begin
  with <!DOCTYPE html>, ImportPlacementBleed among them, had centered cells,
  because the site's centered body reaches table cells only in standards mode.
  Checked in Chromium on all 139 pages; tests/hall-of-fame-links-alignment.test.cjs
  pins it. Thanks to xet7.

- Record that SVG is sanitized and not blocked anymore, 2026-10-25: after
  JVN#74210258 SVG uploads were refused and every SVG served as a download; now
  every SVG is sanitized on upload and again each time it is served, under a
  no-script sandbox Content-Security-Policy, and is an image again - attachment,
  cover, board background, avatar. The FieldBleed page has the new dated entry,
  the Hall of Fame index row links it, and the release audit allows the fix
  commit link on the FieldBleed page only. Thanks to xet7.

- Follow WeKan's docs to their menu-based places: the Drag and drop and Touch
  Screen pages are under General/DragDrop, Sync under Board Settings /
  Import-Export, and the SAML upgrade instructions under Login-Page. The release
  audit's recorded URLs and SAML allowance follow. Thanks to xet7.

- Record the LockoutBleed follow-up of 2026-10-16: the DDP login timing
  equalizer was never loaded, so the web login still told by its response time
  whether a username exists. The LockoutBleed page describes the fix, and the
  release audit allows its commit link on that page only. Thanks to xet7.

- Record the AssignedBleed follow-up of 2026-10-16 (GHSA-r4gm-mjj9-g3x8): board
  role permissions apply to every board view. The index row and the AssignedBleed
  page list the advisory, credit binary-lover beside crypto-nidh, and describe
  the fix; the release audit allows the advisory and fix links on those pages
  only. Thanks to crypto-nidh, binary-lover and xet7.

- Fix the deploy risk check for the AssignedBleed follow-up of 2026-10-15. Allow
  the GHSA-3cgr-47wm-9cc9 advisory on the Hall of Fame index and the AssignedBleed
  page, and the fix commit on the AssignedBleed page, only there. The offline
  release audit, both release test files and all website Node suites pass.
  Thanks to xet7.

- Make the release launcher work with a GitHub CLI older than 2.48. It read
  the list of earlier releases with `gh api --paginate --slurp`, and an older
  `gh` stops with "unknown flag: --slurp". The pages `--paginate` prints one
  after another are now read in turn. Thanks to xet7.

- Fix the release risk check for the SamlSubjectBleed and ZipBombBleed pages.
  Allow the reviewed reporter, SAML upgrade documentation and source-fix links
  only on their respective pages. All 13 risk-audit tests pass, including
  negative checks for changed URLs and use from other files; the release
  launcher's offline audit passes. Thanks to xet7.

- Fix the Pages deployment risk check for the AssignedBleed, BoardBleed and
  RepointBleed follow-up links added on 2026-10-03. Allow the three reviewed
  source-fix URLs only on their respective Hall of Fame pages. Regression
  checks reject changed hosts, repositories, hashes, query strings and use
  from another file. Let the October 2 index regression accept later follow-up
  paragraphs while still requiring its dated text inside collapsed Details.
  Thanks to xet7.

- Add follow-up fixes (2026-10-02) to the LDAPBleed, BruteBleed and TenantBleed
  pages: LDAP certificates are verified by default again, including in Docker
  and the snap; guessing one account from many addresses is slowed without
  locking its owner out; and only a site admin assigns a tenant hostname, never
  the instance's own. Each links its source commit, with one sentence in the
  row's collapsed Details. Allow only these commit URLs on their own pages.
  Prepared locally; no website publication performed. Thanks to xet7.

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
