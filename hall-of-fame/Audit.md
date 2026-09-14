# Hall of Fame star audit

Audit date: **2026-09-14**. Scope: local index and all vulnerability
`index.html` files. Stars measure **disclosure quality and contribution**,
as specified by the maintainer; they do not measure vulnerability severity,
CVSS, number of affected users or whether a CVE exists.

The existing site and WeKan `SECURITY.md` do not define a 1–5 award rubric.
Therefore existing awards cannot yet be certified as correctly calibrated.
No award was changed by this audit. Missing public evidence does not prove
that a researcher supplied a poor report: private reports may contain more.

## Proposed review scale

This is an audit framework, pending maintainer adoption; it is not a claim
that historical awards followed these thresholds.

| Stars | Disclosure quality and contribution evidence |
| ---: | --- |
| 1 | A useful initial report or finding, with limited documented detail. |
| 2 | A clear report identifying the affected behavior and impact. |
| 3 | Reproducible steps or a PoC with sufficient context for remediation. |
| 4 | Detailed, reproducible analysis with strong root-cause or validation evidence. |
| 5 | Exceptional contribution: detailed report plus a useful fix, substantial remediation assistance, or thorough validated exploit/regression work. |

Coordinated disclosure is recorded separately. Public versus private reporting
must be considered with its actual chronology and applicable policy; no
automatic penalty is inferred here. Maintainer remediation/test work must not
be attributed to the reporter without evidence. Internal findings use the same
contribution criteria. Awards belong to the documented contribution, not to
how frightening the vulnerability description sounds.

## Findings

All **111 index entries** have 1–5 stars: 25 one-star, 39 two-star,
4 three-star, 23 four-star and 20 five-star entries. Image-path validation
previously verified 578 references across 92 pages.

Matching-name comparison covered **92 index entries** with linked detail rows (including legacy five-column layouts). Remaining entries have no exact matching-name linked row; they remain unverified.

| Entry | Index stars | Detail page stars | Problem |
| --- | ---: | --- | --- |
| CasBleed | 2 | [casbleed/index.html](casbleed/index.html) — 1 | Display disagreement; confirm same date/report and intended award. |
| OwnerBleed | 3 | [ownerbleed/index.html](ownerbleed/index.html) — 4 | Display disagreement; confirm same date/report and intended award. |
| RoleBleed | 3 | [rolebleed/index.html](rolebleed/index.html) — 4 | Display disagreement; confirm same date/report and intended award. |
| ErrorBleed | 3 | [errorbleed/index.html](errorbleed/index.html) — 4 | Display disagreement; confirm same date/report and intended award. |
| CommentWriteBleed | 3 | [commentwritebleed/index.html](commentwritebleed/index.html) — 4 | Display disagreement; confirm same date/report and intended award. |
| SignupBleed | 2 | [signupbleed/index.html](signupbleed/index.html) — 1 | Display disagreement; confirm same date/report and intended award. |

Follow-up entries may legitimately differ from an older award on a shared
page (for example MimeBleed follow-up); those are not counted as matching-name
inconsistencies. Related-vulnerability cross-links are also excluded. Reused
names such as CasBleed/FileBleed need date/report-aware matching before a
same-name discrepancy can be treated as an erroneous award.

High-priority calibration review: OIDCBleed and ReadOnlyBleed have five
stars with only “detailed report” in the Process summary, while several
four-star entries have the same summary. Their private reports or full page
evidence must establish the exceptional additional contribution. LDAPBleed
has four stars and a supplied fix, with public reporting noted; verify the
actual disclosure timeline and contribution rather than applying an inferred
penalty. Recent one-star advisory entries deserve report-level review because
the public summaries describe remediation, not the supplied report quality.

## Entry-by-entry evidence inventory

These are public Process summaries, not independent verification of private
reports. “Review” means the award is not proven against an adopted rubric;
it does not recommend reducing an award.

| Entry | Stars | Documented Process evidence | Assessment |
| --- | ---: | --- | --- |
| SubtaskDepositBleed | 1 | Responsible disclosure through a saved GitHub security advisory; current code and sibling paths reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| LinkedWriteBleed | 1 | Responsible disclosure through a saved GitHub security advisory; current code and sibling paths reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| InvitationBoardBleed | 1 | Responsible disclosure through a saved GitHub security advisory; current code and sibling paths reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| InviteProfileBleed | 1 | Responsible disclosure through a saved GitHub security advisory; current code and sibling paths reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| RuleButtonBleed | 1 | Responsible disclosure through a saved GitHub security advisory; current code and sibling paths reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| ManageBoardBleed | 1 | Responsible disclosure through a saved GitHub security advisory; current code and sibling paths reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| CommentBoundaryBleed | 1 | Responsible disclosure through a saved GitHub security advisory; REST and DDP comment boundary paths reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| MutationBleed | 1 | Responsible disclosure through a saved GitHub security advisory; membership-only method guards and their siblings reviewed during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| VisibilityBleed | 1 | Responsible disclosure through a saved GitHub security advisory; sibling path found during remediation. | Review report-level evidence; current summary does not establish a calibrated award. |
| WipeBleed | 2 | Found and fixed during an internal security review of Attachments/Avatars (ostrio:files) upload, download and removal authorization. | Review report-level evidence; current summary does not establish a calibrated award. |
| UploadPathBleed | 2 | Found and fixed during an internal security review of Attachments/Avatars (ostrio:files) upload, download and removal authorization. | Review report-level evidence; current summary does not establish a calibrated award. |
| PortraitBleed | 2 | Found and fixed during an internal security review of Attachments/Avatars (ostrio:files) upload, download and removal authorization. | Review report-level evidence; current summary does not establish a calibrated award. |
| RelicAvatarBleed | 2 | Found and fixed during an internal security review of Attachments/Avatars (ostrio:files) upload, download and removal authorization. | Review report-level evidence; current summary does not establish a calibrated award. |
| SheetColorBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against the vendored XLSX parser and sheet-tab CSS serialization. | Review report-level evidence; current summary does not establish a calibrated award. |
| MimeBleed follow-up | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against upload validation and the original Meteor-Files route on every storage backend. | Review report-level evidence; current summary does not establish a calibrated award. |
| CookieTokenBleed | 2 | Coordinated disclosure through a GitHub security advisory, then verified against Meteor 3.5's maintained native HttpOnly resume-token flow. | Review report-level evidence; current summary does not establish a calibrated award. |
| MailTitleBleed | 2 | Coordinated disclosure through a GitHub security advisory, traced from stored activity values through localization to HTML email delivery. | Review report-level evidence; current summary does not establish a calibrated award. |
| SearchBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against the global-search DDP publication and its stored pagination selectors. | Review report-level evidence; current summary does not establish a calibrated award. |
| RuleBleed | 2 | Coordinated disclosure through a GitHub security advisory, verified against DDP-created, scheduled and legacy automation paths. | Review report-level evidence; current summary does not establish a calibrated award. |
| AvatarMimeBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against both current and legacy avatar routes. | Review report-level evidence; current summary does not establish a calibrated award. |
| LegacyAttachBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against the CollectionFS-compatible attachment route. | Review report-level evidence; current summary does not establish a calibrated award. |
| SwimlaneBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced with a read-only board member calling the Meteor method directly. | Review report-level evidence; current summary does not establish a calibrated award. |
| HostnameBleed | 2 | Automated code scanning flagged hostname examples used as incomplete regular expressions. | Review report-level evidence; current summary does not establish a calibrated award. |
| SessionBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against the unauthenticated global-search pagination publications. | Review report-level evidence; current summary does not establish a calibrated award. |
| ClaimBleed | 2 | Coordinated disclosure through a GitHub security advisory, validated against trusted userinfo and attacker-controlled access-token claims. | Review report-level evidence; current summary does not establish a calibrated award. |
| MembershipBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against the unauthenticated DDP publication. | Review report-level evidence; current summary does not establish a calibrated award. |
| ResetBleed | 2 | Coordinated disclosure through a GitHub security advisory, reproduced against Meteor's unauthenticated account-recovery methods. | Review report-level evidence; current summary does not establish a calibrated award. |
| UserSearchBleed | 4 | Two coordinated GitHub security advisories were validated together against both user-search DDP paths. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| MiniProfileBleed | 2 | Coordinated disclosure through a GitHub security advisory, validated against the unauthenticated DDP publication. | Review report-level evidence; current summary does not establish a calibrated award. |
| PositionHistoryBleed | 4 | Coordinated disclosure through a GitHub security advisory, validated at insertion, method and model boundaries. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| SubtaskExportBleed | 4 | Coordinated disclosure through a GitHub security advisory, validated across JSON, ZIP, Excel and PDF exports. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| CasBleed | 2 | Coordinated disclosure through a GitHub security advisory, compared with WeKan's explicit LDAP and OIDC merge controls. | Review report-level evidence; current summary does not establish a calibrated award. |
| ImportBleed | 4 | Coordinated disclosure through a GitHub security advisory, validated against the current DDP import methods and their direct database write chain. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| ChecklistWriteBleed | 4 | Coordinated disclosure through a GitHub security advisory, validated against current REST handlers. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| TokenAuditBleed | 4 | Coordinated disclosure through a GitHub security advisory, validated against current REST handlers. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| OwnerBleed | 3 | Coordinated disclosure through a GitHub security advisory, validated against current REST handlers. | Review report-level evidence; current summary does not establish a calibrated award. |
| RoleBleed | 3 | Coordinated disclosure through a GitHub security advisory, validated against current REST handlers. | Review report-level evidence; current summary does not establish a calibrated award. |
| ErrorBleed | 3 | Coordinated disclosure through a GitHub security advisory, validated against current REST handlers. | Review report-level evidence; current summary does not establish a calibrated award. |
| CommentWriteBleed | 3 | Coordinated disclosure through a GitHub security advisory, validated against current REST handlers. | Review report-level evidence; current summary does not establish a calibrated award. |
| TenantBleed | 4 | Coordinated disclosure through a GitHub security advisory, with insert, update and remove reproduced on both collections. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| AssignedBleed | 4 | Coordinated disclosure through a GitHub security advisory, with a working v11.06 reproduction and root-cause analysis of the missing role flag. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| CalendarBleed | 4 | Coordinated disclosure through a GitHub security advisory, with a working v11.06 reproduction and the canonical authorization helper identified. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| RouteBleed | 2 | Automated code scanning flagged incomplete regular-expression escaping. | Review report-level evidence; current summary does not establish a calibrated award. |
| JamBleed | 4 | Coordinated disclosure through a GitHub security advisory, with a lab reproduction on v10.91, an A/B harness against a patched build, a CVSS assessment the reporter marked as preliminary and offered for independent review, and a 90-day window offered rather than assumed. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| SignupBleed | 2 | Found while reviewing a pull request about the opposite symptom. | Review report-level evidence; current summary does not establish a calibrated award. |
| PurgeBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-8cqr-x6m5-v4w6. | Review report-level evidence; current summary does not establish a calibrated award. |
| HashBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-6qpx-x7vr-p9w6. | Review report-level evidence; current summary does not establish a calibrated award. |
| GuestBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-whxm-pxgj-7wqv. | Review report-level evidence; current summary does not establish a calibrated award. |
| StaleBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-r8r3-23vr-8jh6. | Review report-level evidence; current summary does not establish a calibrated award. |
| AuthorBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-6jr3-42jf-vhm5. | Review report-level evidence; current summary does not establish a calibrated award. |
| PassBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-6p5m-f9p2-wqm5. | Review report-level evidence; current summary does not establish a calibrated award. |
| WhereBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-phm4-4v26-j2vq. | Review report-level evidence; current summary does not establish a calibrated award. |
| PathBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-4mxf-m8pq-xc9p. | Review report-level evidence; current summary does not establish a calibrated award. |
| ParentBleed | 1 | Coordinated disclosure via GitHub Security Advisory GHSA-jvv9-498p-hxrg. | Review report-level evidence; current summary does not establish a calibrated award. |
| RevokeBleed | 1 | Coordinated disclosure via GitHub Security Advisory GHSA-gwc4-fw7p-gw58. | Review report-level evidence; current summary does not establish a calibrated award. |
| CommentBleed | 1 | Coordinated disclosure via GitHub Security Advisory GHSA-pqr4-rxgp-hv2m. | Review report-level evidence; current summary does not establish a calibrated award. |
| PatternBleed | 2 | Automated code scanning flagged the identity (no-op) replacement. | Review report-level evidence; current summary does not establish a calibrated award. |
| LockoutBleed | 1 | Coordinated disclosure via GitHub Security Advisory GHSA-2g94-9x3m-hv37. | Review report-level evidence; current summary does not establish a calibrated award. |
| FollowBleed | 1 | Coordinated disclosure via GitHub Security Advisory GHSA-j9p2-jm73-p549. | Review report-level evidence; current summary does not establish a calibrated award. |
| TransitBleed | 1 | Coordinated disclosure via GitHub Security Advisory GHSA-c5xr-mg26-vq5w. | Review report-level evidence; current summary does not establish a calibrated award. |
| CrashBleed | 2 | Coordinated disclosure via GitHub Security Advisory GHSA-3gcg-g6rf-w2rx. | Review report-level evidence; current summary does not establish a calibrated award. |
| ZipBleed | 1 | Found while reviewing the open dependency pull requests. | Review report-level evidence; current summary does not establish a calibrated award. |
| ExportBleed | 1 | Privately reported via GitHub Security Advisory GHSA-8r5p-4q9j-f5jx. | Review report-level evidence; current summary does not establish a calibrated award. |
| RedirectBleed | 1 | Privately reported 8 issues reviewed against WeKan v9.95.0. | Review report-level evidence; current summary does not establish a calibrated award. |
| SourceBleed | 1 | Privately reported 8 issues reviewed against WeKan v9.95.0. | Review report-level evidence; current summary does not establish a calibrated award. |
| LiveBleed | 1 | Privately reported 8 issues reviewed against WeKan v9.95.0. | Review report-level evidence; current summary does not establish a calibrated award. |
| CasBleed | 1 | Privately reported 8 issues reviewed against WeKan v9.95.0. | Review report-level evidence; current summary does not establish a calibrated award. |
| MetricsBleed | 1 | Privately reported 8 issues reviewed against WeKan v9.95.0. | Review report-level evidence; current summary does not establish a calibrated award. |
| ImpersonateBleed | 1 | Privately reported 8 issues reviewed against WeKan v9.95.0. | Review report-level evidence; current summary does not establish a calibrated award. |
| InviteBleed | 1 | Privately reported 8 issues reviewed against WeKan v9.95.0. | Review report-level evidence; current summary does not establish a calibrated award. |
| SpliceBleed | 2 | Automated code scanning flagged the incomplete multi-character sanitization. | Review report-level evidence; current summary does not establish a calibrated award. |
| IdentityBleed | 2 | Automated code scanning flagged the identity (no-op) replacement. | Review report-level evidence; current summary does not establish a calibrated award. |
| EscapeBleed | 2 | Automated code scanning flagged the incomplete escaping. | Review report-level evidence; current summary does not establish a calibrated award. |
| RandomBleed | 2 | Automated code scanning flagged the biased randomness. | Review report-level evidence; current summary does not establish a calibrated award. |
| MimeBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| SortBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| ScannerBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| ExcelBleed | 5 | Did send detailed report with runtime-confirmed PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| DnsBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| ChecklistBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| InputBleed | 2 | Automated code scanning flagged the incomplete sanitization. | Review report-level evidence; current summary does not establish a calibrated award. |
| ProxyBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| BoardBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| TokenBleed | 5 | Did send detailed report with PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| CloneBleed | 5 | Did send detailed report with full PoC! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| OIDCBleed | 5 | Did send detailed report! | Review: detailed report alone does not establish proposed exceptional contribution. |
| ReadOnlyBleed | 5 | Did send detailed report! | Review: detailed report alone does not establish proposed exceptional contribution. |
| WebhookBleed | 4 | Found and fixed by code review. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| FileBleed | 4 | Reported responsibly, fixed quickly. | Review report-level reproduction and analysis; summary alone does not certify 4. |
| BFLABleed | 5 | Did send detailed report with full PoC and runtime verification! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| AuthBleed | 5 | Did send detailed report with full PoC and runtime verification! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| AvatarBleed | 5 | Did send detailed report and suggested fix! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| IntegrationBleed | 5 | Did send detailed report and fix! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| AnchorBleed | 5 | Did send detailed report and fix! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| FloppyBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| SnowBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| MegaBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| SpaceBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| FieldBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| SocialBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| AdminBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| InvisibleBleed | 2 | Sent report and disappeared. | Review report-level evidence; current summary does not establish a calibrated award. |
| ReactionBleed | 5 | Did send detailed report and fix! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| FileBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| Emailbleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |
| LDAPBleed | 4 | Did send report and sent fix! Although, report was at public GitHub issue , not via Responsible Security Disclosure | Review report-level reproduction and analysis; summary alone does not certify 4. |
| DUEBleed | 2 | Did not notice security issue originally when merging new feature from pull request. Did fix issue when finally noticed it at production at Wekan demo server. | Review report-level evidence; current summary does not establish a calibrated award. |
| BypassBleed | 5 | Did send detailed report and helped fixing! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| UserBleed | 5 | Did send detailed report and fix! | Strong contribution stated; verify report/patch/validation before certifying 5. |
| BruteBleed | 1 | Did not report to Wekan, was found later from CVE | Review report-level evidence; current summary does not establish a calibrated award. |
| FrameBleed | 4 | Did send detailed report! | Review report-level reproduction and analysis; summary alone does not certify 4. |

## Progress and remaining work

Completed: exhaustive index award-range/count inventory; matching-name
index/detail comparison; review of every Process summary; separation of
severity from contribution; identification of unsupported calibration claims.

Remaining: adopt a rubric, inspect original report/PoC/patch and correspondence
for every contribution, distinguish repeated names and follow-ups by date,
resolve display discrepancies, then record justified retained or adjusted
awards with evidence. Public summaries alone cannot finish that review.
No remote changes or award edits were made.
