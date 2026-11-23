# Hall of Fame Star audit

Ranking adopted and star corrections applied locally: **2026-09-14**.
Audited again: **2026-11-18**, see the section below.
The maintainer specifies **disclosure quality and contribution**, not severity.
Source catalogue: [WeKan GitHub security advisories](https://github.com/wekan/wekan/security/advisories).
The public REST catalogue returned **75 published advisories** on this date.
Advisory bodies were inspected for report detail and explicit suggested fix /
remediation prose. Later maintainer fixes do not themselves prove that the
researcher suggested a fix. Private correspondence is not available here.

## Maintainer ranking

| Stars | Conditions |
| ---: | --- |
| 5 | Researcher successfully submitted a GHSA advisory, provided details and suggested a fix. |
| 4 | Researcher submitted a GHSA advisory with details; suggested fix is missing. |
| 3 | No GHSA advisory; a suggested fix/contribution is present. |
| 2 | No GHSA advisory and no suggested fix. |
| 1 | Email report with no GHSA and no suggested fix, and researcher did not reply to a request for additional information. |

The specific two-star condition takes precedence over the general “no GHSA”
three-star wording. One star requires all listed conditions; silence or an
email alone is insufficient. Chat reports are not automatically email reports.
Internal code/patch contributions without a GHSA use three stars where a fix
is documented. A detailed PoC alone does not substitute for suggested fixes
under this ranking. Suggested remediation can be prose; a patch is optional.

## A GHSA added later

A researcher who sent the report to security@wekan.fi, or some other way, may
later be able to add it as a GitHub security advisory. When they do, the
maintainer of WeKan requests the CVE through that GHSA, and the row is ranked
again as a GHSA report: **3 stars become 5**. Until then the row stays at 3,
and its Process cell says the GHSA is awaited.

Whenever an AI updates or audits the Hall of Fame, it checks every 3-star row
whose Process says the report came without a GHSA against
[WeKan Security Advisories](https://github.com/wekan/wekan/security/advisories).
When a GHSA for that same report now exists - matched by the report's subject
and reporter, never by a nearby advisory about something else - it:

- sets the row to 5 stars on the index and on the row's own page;
- links the GHSA, and puts the CVE in the CVE cell once one is assigned;
- rewrites the Process cell to say the report later arrived as a GHSA;
- adds a line to the award inventory below, Previous 3, Current 5.

## Corrections and limits

The index contains **111 entries**; **95 displayed awards changed** and
**86 linked detail pages changed**. Current index and matching dated detail
rows were updated together, including legacy five-column rows. Repeated names
and follow-ups are matched by date; older reports are not conflated with newer
advisories. Unrelated cross-links do not receive another vulnerability's award.

**16 entries remain evidence-limited**, marked below. Two-star assignments in
those rows reflect the available public evidence and require historical/private
confirmation. No one-star award is inferred without an email and an unanswered
additional-information request. InvisibleBleed's page describes a chat report
and disappearance, which does not establish that condition. BruteBleed's CVE
alone also does not establish email nonresponse. Older advisory links on the
index can identify a different issue: matching uses report subject, rather than
blindly treating an existing link as proof of a researcher's contribution.

Historical timeline entries may describe the old bonus at the time it was
awarded; those records remain historical. The current award is the main
contribution row. Private/unpublished advisories are not assumed absent solely
because they are missing from the public catalogue.

## Award inventory

| Entry | Date | Previous | Current | GHSA evidence | Reason / remaining review |
| --- | --- | ---: | ---: | --- | --- |
| BounceBleed | 2026-11-22 | - | 5 | [GHSA-7w85-38ph-c96v](https://github.com/wekan/wekan/security/advisories/GHSA-7w85-38ph-c96v) | GHSA with a source-to-sink trace, a proof of concept and a suggested fix, validated against the current code; also filed as GHSA-2wcc-f289-3r95 and GHSA-735h-p955-fwxp, one award. |
| CloudPanelBleed | 2026-11-22 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| ListLockMoveBleed | 2026-11-22 | - | 5 | [GHSA-394w-8q99-q4qx](https://github.com/wekan/wekan/security/advisories/GHSA-394w-8q99-q4qx) | GHSA with the affected lines, an end-to-end proof of concept against the official v13.27 bundle and an explicit suggested fix (ask assertSwimlaneListsNotRefused in the REST swimlane move, and extend tests/listLockStructure.test.cjs to it); the 500 on every REST swimlane move it noticed was fixed with it. |
| ListLockBulkBleed | 2026-11-18 | - | 4 | [GHSA-83w9-74mx-7v83](https://github.com/wekan/wekan/security/advisories/GHSA-83w9-74mx-7v83) | GHSA with the affected lines and a proof of concept against v13.15 (bulk delete, bulk labels, archiveSelectedCards, copyCard, createLinkedCard); it names the missing check and the paths that have it, but proposes no fix, so 4. |
| RaceBleed | 2026-11-18 | - | 5 | [GHSA-3vjg-3p4q-8fwh](https://github.com/wekan/wekan/security/advisories/GHSA-3vjg-3p4q-8fwh) | GHSA code path, dual-browser proof of concept and suggested fix direction (re-validate or remove the card first) verified against v13.14; the hooked removals, the bulk delete and the custom-field link clean-up had the same shape and were fixed with it. |
| ListLockAttachBleed | 2026-11-11 | - | 3 | No matched published advisory | Emailed with affected lines, proof of concept and suggested fix; no GHSA yet. Rechecked 2026-11-18: no published advisory matches it by subject and reporter, so it stays at 3 and the GHSA is awaited. |
| ListLockBleed | 2026-11-09 | - | 5 | [GHSA-4734-8vrg-8j3w](https://github.com/wekan/wekan/security/advisories/GHSA-4734-8vrg-8j3w) | GHSA details, proof of concept and an explicit suggested fix verified. |
| UnassignedArchiveBleed | 2026-11-08 | - | 5 | [GHSA-6xqf-jh8x-4wxc](https://github.com/wekan/wekan/security/advisories/GHSA-6xqf-jh8x-4wxc) | GHSA details, proof of concept and an explicit suggested fix verified. |
| CreateBleed | 2026-11-07 | - | 5 | [GHSA-qcfm-2g4w-wqcc](https://github.com/wekan/wekan/security/advisories/GHSA-qcfm-2g4w-wqcc) | GHSA code paths, proof of concept and suggested fix (one helper on every path) verified against v12.99; import, clone, copy and card-to-board were found with it and guarded too. |
| GroupLinkBleed | 2026-11-06 | 5 | 5 | [GHSA-v544-rmr5-38gx](https://github.com/wekan/wekan/security/advisories/GHSA-v544-rmr5-38gx) | GHSA proof of concept, regression test and suggested fix verified against v12.97; reactivating a removed member was added to the member check. |
| UnassignedAttachBleed | 2026-11-01 | 5 | 5 | [GHSA-w26g-rc43-q6cm](https://github.com/wekan/wekan/security/advisories/GHSA-w26g-rc43-q6cm) | GHSA reproduction against v12.74 and a suggested fix for both routes verified; the copy, move and DDP siblings were fixed with them. |
| CrossBoardExportBleed | 2026-11-01 | 5 | 5 | [GHSA-8885-xrq4-j47h](https://github.com/wekan/wekan/security/advisories/GHSA-8885-xrq4-j47h) | GHSA details, verification code and a suggested fix for both findings verified. |
| ImportPlacementBleed | 2026-10-29 | 3 | 5 | [GHSA-pm7j-752h-qfvj](https://github.com/wekan/wekan/security/advisories/GHSA-pm7j-752h-qfvj) | Published GHSA details and suggested remediation verified. |
| UploadBleed | 2026-10-27 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| StampBleed | 2026-10-27 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| SamlSubjectBleed | 2026-10-03 | 3 | 4 | [GHSA-966m-4qgp-j8w4](https://github.com/wekan/wekan/security/advisories/GHSA-966m-4qgp-j8w4) | GHSA details and proof of concept verified 2026-11-18. The remedy is implied by comparison with the OIDC fix, not stated as a suggested fix, as for CookieTokenBleed; the index showed 3. |
| SyncBleed | 2026-10-02 | - | 5 | [GHSA-5q84-p3vr-f3xv](https://github.com/wekan/wekan/security/advisories/GHSA-5q84-p3vr-f3xv) | GHSA details, proof of concept and suggested fix (an attached patch) verified. |
| CacheBleed | 2026-10-02 | - | 5 | [GHSA-w3qg-pf27-g68r](https://github.com/wekan/wekan/security/advisories/GHSA-w3qg-pf27-g68r) | GHSA details, proof of concept and an explicit suggested fix verified. |
| ZipBombBleed | 2026-10-02 | - | 3 | No matched published advisory | Found and fixed by xet7. alham-rizvi's later GHSA-rmcq-68x2-3g5j reported it independently after the fix and is not published; the award stays with the code review. |
| RepointBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| PrototypeBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| BackgroundBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| CodeBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| HookBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| CasTokenBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| TrayBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| HookUrlBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| DirectoryInfoBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| MigrationBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| AuthMethodBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| ArchiveBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| RelayBleed | 2026-10-02 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| ReplyBleed | 2026-09-30 | - | 5 | [GHSA-mc7c-cv99-64h7](https://github.com/wekan/wekan/security/advisories/GHSA-mc7c-cv99-64h7) | GHSA details and its remediation section verified. |
| CopyIdentityBleed | 2026-09-29 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| AdminFieldBleed | 2026-09-28 | 3 | 5 | [GHSA-m8gh-2h78-f57x](https://github.com/wekan/wekan/security/advisories/GHSA-m8gh-2h78-f57x) | GHSA details, proof of concept and an explicit "Suggested fix" verified 2026-11-18; the index showed 3, as for a report without a GHSA. |
| LdapBindBleed | 2026-09-27 | - | 5 | [GHSA-m87f-f43w-hwmc](https://github.com/wekan/wekan/security/advisories/GHSA-m87f-f43w-hwmc) | GHSA details, proof of concept and an explicit suggested fix verified. |
| ExportScopeBleed | 2026-09-27 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| HistoryScopeBleed | 2026-09-27 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| DirectoryGroupBleed | 2026-09-27 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| SamlReplayBleed | 2026-09-27 | - | 3 | No matched published advisory | No GHSA; found and fixed by xet7, code review/patch contribution (not a researcher advisory). |
| InactiveBleed | 2026-09-26 | - | 5 | [GHSA-f246-3x88-w3w3](https://github.com/wekan/wekan/security/advisories/GHSA-f246-3x88-w3w3) | GHSA details, proof of concept and an explicit suggested fix verified. |
| AuthTraceBleed | 2026-09-23 | - | 3 | No matched published advisory | GitHub CodeQL alerts #543 and #544 with the fix and sibling review by xet7, as the other code scanning entries; the index showed no stars until 2026-11-18. |
| SubtaskDepositBleed | 2026-09-14 | 1 | 5 | [GHSA-483r-px2x-cjcg](https://github.com/wekan/wekan/security/advisories/GHSA-483r-px2x-cjcg) | Published GHSA details and suggested remediation verified. |
| LinkedWriteBleed | 2026-09-14 | 1 | 5 | [GHSA-jp39-3pf7-q5ww](https://github.com/wekan/wekan/security/advisories/GHSA-jp39-3pf7-q5ww) | Published GHSA details and suggested remediation verified. |
| InvitationBoardBleed | 2026-09-14 | 1 | 5 | [GHSA-p9qq-frc9-qfhm](https://github.com/wekan/wekan/security/advisories/GHSA-p9qq-frc9-qfhm) | Published GHSA details and suggested remediation verified. |
| InviteProfileBleed | 2026-09-14 | 1 | 5 | [GHSA-h2g5-h8g8-grxf](https://github.com/wekan/wekan/security/advisories/GHSA-h2g5-h8g8-grxf) | Published GHSA details and suggested remediation verified. |
| RuleButtonBleed | 2026-09-14 | 1 | 5 | [GHSA-7c42-4mc2-99g2](https://github.com/wekan/wekan/security/advisories/GHSA-7c42-4mc2-99g2) | Published GHSA details and suggested remediation verified. |
| ManageBoardBleed | 2026-09-14 | 1 | 5 | [GHSA-v368-jwmq-53h8](https://github.com/wekan/wekan/security/advisories/GHSA-v368-jwmq-53h8) | Published GHSA details and suggested remediation verified. |
| CommentBoundaryBleed | 2026-09-14 | 1 | 5 | [GHSA-47xv-5hh2-x5c9](https://github.com/wekan/wekan/security/advisories/GHSA-47xv-5hh2-x5c9) | Published GHSA details and suggested remediation verified. |
| MutationBleed | 2026-09-14 | 1 | 5 | [GHSA-8g7j-c3xh-36h7](https://github.com/wekan/wekan/security/advisories/GHSA-8g7j-c3xh-36h7) | Published GHSA details and suggested remediation verified. |
| VisibilityBleed | 2026-09-14 | 1 | 5 | [GHSA-9qg3-jfch-jwqv](https://github.com/wekan/wekan/security/advisories/GHSA-9qg3-jfch-jwqv) | Published GHSA details and suggested remediation verified. |
| WipeBleed | 2026-09-09 | 2 | 5 | [GHSA-xhc4-477v-jmg3](https://github.com/wekan/wekan/security/advisories/GHSA-xhc4-477v-jmg3) | Published GHSA details and suggested remediation verified. |
| UploadPathBleed | 2026-09-09 | 2 | 5 | [GHSA-32gm-7gcp-w2c6](https://github.com/wekan/wekan/security/advisories/GHSA-32gm-7gcp-w2c6) | Published GHSA details and suggested remediation verified. |
| PortraitBleed | 2026-09-09 | 2 | 5 | [GHSA-6h68-m988-228w](https://github.com/wekan/wekan/security/advisories/GHSA-6h68-m988-228w) | Published GHSA details and suggested remediation verified. |
| RelicAvatarBleed | 2026-09-09 | 2 | 5 | [GHSA-49wg-hc9w-fw45](https://github.com/wekan/wekan/security/advisories/GHSA-49wg-hc9w-fw45) | Published GHSA details and suggested remediation verified. |
| SheetColorBleed | 2026-09-05 | 2 | 5 | [GHSA-crq2-phg8-4xvg](https://github.com/wekan/wekan/security/advisories/GHSA-crq2-phg8-4xvg) | Published GHSA details and suggested remediation verified. |
| MimeStorageBleed | 2026-09-01 | 2 | 5 | [GHSA-rv5g-5p4g-3v89](https://github.com/wekan/wekan/security/advisories/GHSA-rv5g-5p4g-3v89) | Published GHSA details and suggested remediation verified. |
| CookieTokenBleed | 2026-08-29 | 2 | 4 | [GHSA-8phm-9rqm-v9hc](https://github.com/wekan/wekan/security/advisories/GHSA-8phm-9rqm-v9hc) | Published GHSA details verified; no explicit suggested-fix section/prose found. Review implied advice separately. |
| MailTitleBleed | 2026-08-29 | 2 | 4 | [GHSA-hp9m-vff5-7pvw](https://github.com/wekan/wekan/security/advisories/GHSA-hp9m-vff5-7pvw) | Published GHSA details verified; no explicit suggested-fix section/prose found. Review implied advice separately. |
| SearchBleed | 2026-08-29 | 2 | 5 | [GHSA-33h9-rc5h-667p](https://github.com/wekan/wekan/security/advisories/GHSA-33h9-rc5h-667p) | Published GHSA details and suggested remediation verified. |
| RuleBleed | 2026-08-29 | 2 | 5 | [GHSA-9w4x-hf2r-hc9v](https://github.com/wekan/wekan/security/advisories/GHSA-9w4x-hf2r-hc9v) | Published GHSA details and suggested remediation verified. |
| AvatarMimeBleed | 2026-08-28 | 2 | 5 | [GHSA-4mjm-vj9f-p629](https://github.com/wekan/wekan/security/advisories/GHSA-4mjm-vj9f-p629) | Published GHSA details and suggested remediation verified. |
| LegacyAttachBleed | 2026-08-28 | 2 | 5 | [GHSA-xcxp-hx9w-q5q9](https://github.com/wekan/wekan/security/advisories/GHSA-xcxp-hx9w-q5q9) | Published GHSA details and suggested remediation verified. |
| SwimlaneBleed | 2026-08-28 | 2 | 5 | [GHSA-2x89-6mq2-834r](https://github.com/wekan/wekan/security/advisories/GHSA-2x89-6mq2-834r) | Published GHSA details and suggested remediation verified. |
| HostnameBleed | 2026-08-27 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| SessionBleed | 2026-08-27 | 2 | 5 | [GHSA-5gcv-2hhj-7rg9](https://github.com/wekan/wekan/security/advisories/GHSA-5gcv-2hhj-7rg9) | Published GHSA details and suggested remediation verified. |
| ClaimBleed | 2026-08-26 | 2 | 5 | [GHSA-xwv8-m73h-68vg](https://github.com/wekan/wekan/security/advisories/GHSA-xwv8-m73h-68vg) | Published GHSA details and suggested remediation verified. |
| MembershipBleed | 2026-08-26 | 2 | 5 | [GHSA-5r3j-h65h-fg22](https://github.com/wekan/wekan/security/advisories/GHSA-5r3j-h65h-fg22) | Published GHSA details and suggested remediation verified. |
| ResetBleed | 2026-08-26 | 2 | 5 | [GHSA-9cgp-m28v-64xv](https://github.com/wekan/wekan/security/advisories/GHSA-9cgp-m28v-64xv) | Published GHSA details and suggested remediation verified. |
| UserSearchBleed | 2026-08-25 | 4 | 5 | [GHSA-88mv-h439-rj8j](https://github.com/wekan/wekan/security/advisories/GHSA-88mv-h439-rj8j), [GHSA-9846-cj96-6hv5](https://github.com/wekan/wekan/security/advisories/GHSA-9846-cj96-6hv5) | Published GHSA details and suggested remediation verified. |
| MiniProfileBleed | 2026-08-25 | 2 | 5 | [GHSA-c3ch-34g5-x3x7](https://github.com/wekan/wekan/security/advisories/GHSA-c3ch-34g5-x3x7) | Published GHSA details and suggested remediation verified. |
| PositionHistoryBleed | 2026-08-25 | 4 | 5 | [GHSA-5fc2-m4gw-j6qq](https://github.com/wekan/wekan/security/advisories/GHSA-5fc2-m4gw-j6qq) | Published GHSA details and suggested remediation verified. |
| SubtaskExportBleed | 2026-08-25 | 4 | 5 | [GHSA-hvvr-j425-5xxm](https://github.com/wekan/wekan/security/advisories/GHSA-hvvr-j425-5xxm) | Published GHSA details and suggested remediation verified. |
| CasAccountMergeBleed | 2026-08-25 | 2 | 5 | [GHSA-5797-pjx8-9h6m](https://github.com/wekan/wekan/security/advisories/GHSA-5797-pjx8-9h6m) | Published GHSA details and suggested remediation verified. |
| ImportBleed | 2026-08-23 | 4 | 5 | [GHSA-qp32-wqxw-wq3h](https://github.com/wekan/wekan/security/advisories/GHSA-qp32-wqxw-wq3h) | Published GHSA details and suggested remediation verified. |
| ChecklistWriteBleed | 2026-08-22 | 4 | 5 | [GHSA-cp24-5m9m-wm97](https://github.com/wekan/wekan/security/advisories/GHSA-cp24-5m9m-wm97) | Published GHSA details and suggested remediation verified. |
| TokenAuditBleed | 2026-08-22 | 4 | 5 | [GHSA-5r57-9vj7-c64f](https://github.com/wekan/wekan/security/advisories/GHSA-5r57-9vj7-c64f) | Published GHSA details and suggested remediation verified. |
| OwnerBleed | 2026-08-22 | 3 | 5 | [GHSA-6jvj-85q3-6q2m](https://github.com/wekan/wekan/security/advisories/GHSA-6jvj-85q3-6q2m) | Published GHSA details and suggested remediation verified. |
| RoleBleed | 2026-08-22 | 3 | 5 | [GHSA-qf5c-63jx-mpv4](https://github.com/wekan/wekan/security/advisories/GHSA-qf5c-63jx-mpv4) | Published GHSA details and suggested remediation verified. |
| ErrorBleed | 2026-08-22 | 3 | 5 | [GHSA-h59p-76c3-8345](https://github.com/wekan/wekan/security/advisories/GHSA-h59p-76c3-8345) | Published GHSA details and suggested remediation verified. |
| CommentWriteBleed | 2026-08-22 | 3 | 5 | [GHSA-5r4m-5xx6-96jf](https://github.com/wekan/wekan/security/advisories/GHSA-5r4m-5xx6-96jf) | Published GHSA details and suggested remediation verified. |
| TenantBleed | 2026-08-21 | 4 | 5 | [GHSA-p4cq-83j9-7g73](https://github.com/wekan/wekan/security/advisories/GHSA-p4cq-83j9-7g73) | Published GHSA details and suggested remediation verified. |
| AssignedBleed | 2026-08-21 | 4 | 5 | [GHSA-f396-42fx-vr88](https://github.com/wekan/wekan/security/advisories/GHSA-f396-42fx-vr88) | Published GHSA details and suggested remediation verified. |
| CalendarBleed | 2026-08-21 | 4 | 5 | [GHSA-fpm6-r5fg-2mrg](https://github.com/wekan/wekan/security/advisories/GHSA-fpm6-r5fg-2mrg) | Published GHSA details and suggested remediation verified. |
| RouteBleed | 2026-08-17 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| JamBleed | 2026-08-16 | 4 | 5 | [GHSA-rf3w-rj48-jxcc](https://github.com/wekan/wekan/security/advisories/GHSA-rf3w-rj48-jxcc) | Published GHSA details and suggested remediation verified. |
| SignupBleed | 2026-08-16 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| PurgeBleed | 2026-08-15 | 2 | 5 | [GHSA-8cqr-x6m5-v4w6](https://github.com/wekan/wekan/security/advisories/GHSA-8cqr-x6m5-v4w6) | Published GHSA details and suggested remediation verified. |
| HashBleed | 2026-08-15 | 2 | 5 | [GHSA-6qpx-x7vr-p9w6](https://github.com/wekan/wekan/security/advisories/GHSA-6qpx-x7vr-p9w6) | Published GHSA details and suggested remediation verified. |
| GuestBleed | 2026-08-15 | 2 | 5 | [GHSA-whxm-pxgj-7wqv](https://github.com/wekan/wekan/security/advisories/GHSA-whxm-pxgj-7wqv) | Published GHSA details and suggested remediation verified. |
| StaleBleed | 2026-08-15 | 2 | 5 | [GHSA-r8r3-23vr-8jh6](https://github.com/wekan/wekan/security/advisories/GHSA-r8r3-23vr-8jh6) | Published GHSA details and suggested remediation verified. |
| AuthorBleed | 2026-08-15 | 2 | 5 | [GHSA-6jr3-42jf-vhm5](https://github.com/wekan/wekan/security/advisories/GHSA-6jr3-42jf-vhm5) | Published GHSA details and suggested remediation verified. |
| PassBleed | 2026-08-11 | 2 | 5 | [GHSA-6p5m-f9p2-wqm5](https://github.com/wekan/wekan/security/advisories/GHSA-6p5m-f9p2-wqm5) | Published GHSA details and suggested remediation verified. |
| WhereBleed | 2026-08-11 | 2 | 5 | [GHSA-phm4-4v26-j2vq](https://github.com/wekan/wekan/security/advisories/GHSA-phm4-4v26-j2vq) | Published GHSA details and suggested remediation verified. |
| PathBleed | 2026-08-09 | 2 | 5 | [GHSA-4mxf-m8pq-xc9p](https://github.com/wekan/wekan/security/advisories/GHSA-4mxf-m8pq-xc9p) | Published GHSA details and suggested remediation verified. |
| ParentBleed | 2026-08-09 | 1 | 5 | [GHSA-jvv9-498p-hxrg](https://github.com/wekan/wekan/security/advisories/GHSA-jvv9-498p-hxrg) | Published GHSA details and suggested remediation verified. |
| RevokeBleed | 2026-08-09 | 1 | 5 | [GHSA-gwc4-fw7p-gw58](https://github.com/wekan/wekan/security/advisories/GHSA-gwc4-fw7p-gw58) | Published GHSA details and suggested remediation verified. |
| CommentBleed | 2026-08-09 | 1 | 5 | [GHSA-pqr4-rxgp-hv2m](https://github.com/wekan/wekan/security/advisories/GHSA-pqr4-rxgp-hv2m) | Published GHSA details and suggested remediation verified. |
| PatternBleed | 2026-08-08 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| LockoutBleed | 2026-08-04 | 1 | 5 | [GHSA-2g94-9x3m-hv37](https://github.com/wekan/wekan/security/advisories/GHSA-2g94-9x3m-hv37) | Published GHSA details and suggested remediation verified. |
| FollowBleed | 2026-08-03 | 1 | 5 | [GHSA-j9p2-jm73-p549](https://github.com/wekan/wekan/security/advisories/GHSA-j9p2-jm73-p549) | Published GHSA details and suggested remediation verified. |
| TransitBleed | 2026-08-03 | 1 | 5 | [GHSA-c5xr-mg26-vq5w](https://github.com/wekan/wekan/security/advisories/GHSA-c5xr-mg26-vq5w) | Published GHSA details and suggested remediation verified. |
| CrashBleed | 2026-07-26 | 2 | 5 | [GHSA-3gcg-g6rf-w2rx](https://github.com/wekan/wekan/security/advisories/GHSA-3gcg-g6rf-w2rx) | Published GHSA details and suggested remediation verified. |
| ZipBleed | 2026-07-25 | 1 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| ExportBleed | 2026-07-22 | 1 | 5 | [GHSA-8r5p-4q9j-f5jx](https://github.com/wekan/wekan/security/advisories/GHSA-8r5p-4q9j-f5jx) | Published GHSA details and suggested remediation verified. |
| RedirectBleed | 2026-07-19 | 2 | 5 | [GHSA-g98f-44gc-hqcc](https://github.com/wekan/wekan/security/advisories/GHSA-g98f-44gc-hqcc) | The private report later arrived as a GHSA (triage, 2026-11-16) with details, a proof of concept and a suggested fix; the fix was already in WeKan and was verified against the GHSA. |
| SourceBleed | 2026-07-19 | 2 | 5 | [GHSA-x6fh-wrr5-3426](https://github.com/wekan/wekan/security/advisories/GHSA-x6fh-wrr5-3426) | The private report later arrived as a GHSA (triage, 2026-11-16) with details, a proof of concept and a suggested fix; the fix was already in WeKan and was verified against the GHSA. |
| LiveBleed | 2026-07-19 | 2 | 5 | [GHSA-28hr-j65r-grj2](https://github.com/wekan/wekan/security/advisories/GHSA-28hr-j65r-grj2) | The private report later arrived as a GHSA (triage, 2026-11-16) with details, a proof of concept and a suggested fix; the fix was already in WeKan and was verified against the GHSA. |
| CasRaceBleed | 2026-07-19 | 2 | 5 | [GHSA-mrhx-8xm7-chrq](https://github.com/wekan/wekan/security/advisories/GHSA-mrhx-8xm7-chrq) | The private report later arrived as a GHSA (triage, 2026-11-16) with details, a proof of concept and a suggested fix; the fix was already in WeKan and was verified against the GHSA. |
| OidcRaceBleed | 2026-07-19 | - | 5 | [GHSA-6944-p22h-3qpx](https://github.com/wekan/wekan/security/advisories/GHSA-6944-p22h-3qpx) | The eighth issue of meifukun's report, published as a GHSA on 2026-11-20 with details, a proof of concept and a suggested fix. Its row was added on 2026-11-23, when the advisory was found missing from the Hall of Fame; the fix was already in WeKan v9.97 (#4897). |
| MetricsBleed | 2026-07-19 | 2 | 5 | [GHSA-83qj-w8mp-w4qf](https://github.com/wekan/wekan/security/advisories/GHSA-83qj-w8mp-w4qf) | The private report later arrived as a GHSA (triage, 2026-11-16) with details, a proof of concept and a suggested fix; the fix was already in WeKan and was verified against the GHSA. |
| ImpersonateBleed | 2026-07-19 | 2 | 5 | [GHSA-j4x8-689m-h4hv](https://github.com/wekan/wekan/security/advisories/GHSA-j4x8-689m-h4hv) | The report later arrived as a GHSA with details, a proof of concept and a suggested fix (2026-11-20). |
| InviteBleed | 2026-07-19 | 2 | 5 | [GHSA-rg85-qx5c-qx67](https://github.com/wekan/wekan/security/advisories/GHSA-rg85-qx5c-qx67) | The report later arrived as a GHSA with details, a proof of concept and a suggested fix (2026-11-20). |
| SpliceBleed | 2026-07-22 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| IdentityBleed | 2026-07-22 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| EscapeBleed | 2026-07-17 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| RandomBleed | 2026-07-17 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| MimeBleed | 2026-07-14 | 5 | 4 | [GHSA-jhph-whx8-wq6p](https://github.com/wekan/wekan/security/advisories/GHSA-jhph-whx8-wq6p) | Published GHSA details verified; no explicit suggested-fix section/prose found. Review implied advice separately. |
| SortBleed | 2026-07-13 | 5 | 5 | [GHSA-xm8x-c8wg-jhmf](https://github.com/wekan/wekan/security/advisories/GHSA-xm8x-c8wg-jhmf) | Published GHSA details and suggested remediation verified. |
| ScannerBleed | 2026-07-05 | 5 | 5 | [GHSA-x3xm-pxrv-jg7p](https://github.com/wekan/wekan/security/advisories/GHSA-x3xm-pxrv-jg7p) | Published GHSA details and suggested remediation verified. |
| ExcelBleed | 2026-07-05 | 5 | 5 | [GHSA-mwq8-ccpm-r533](https://github.com/wekan/wekan/security/advisories/GHSA-mwq8-ccpm-r533) | Published GHSA details and suggested remediation verified. |
| DnsBleed | 2026-07-01 | 5 | 5 | [GHSA-66m2-4wfr-c45p](https://github.com/wekan/wekan/security/advisories/GHSA-66m2-4wfr-c45p) | Published GHSA details and suggested remediation verified. |
| ChecklistBleed | 2026-06-20 | 5 | 5 | [GHSA-gv8h-5p3p-6hx7](https://github.com/wekan/wekan/security/advisories/GHSA-gv8h-5p3p-6hx7) | Published GHSA details and suggested remediation verified. |
| InputBleed | 2026-06-18 | 2 | 3 | No matched published advisory | No matching GHSA; code review/patch contribution recorded (not a researcher advisory). |
| ProxyBleed | 2026-06-15 | 5 | 5 | [GHSA-jggc-qvfc-jr6x](https://github.com/wekan/wekan/security/advisories/GHSA-jggc-qvfc-jr6x) | Published GHSA details and suggested remediation verified. |
| BoardBleed | 2026-06-11 | 5 | 4 | [GHSA-gm7v-pc38-53jr](https://github.com/wekan/wekan/security/advisories/GHSA-gm7v-pc38-53jr) | Published GHSA details verified; no explicit suggested-fix section/prose found. Review implied advice separately. |
| TokenBleed | 2026-06-10 | 5 | 5 | [GHSA-cv95-8h7c-2ffq](https://github.com/wekan/wekan/security/advisories/GHSA-cv95-8h7c-2ffq) | Published GHSA details and suggested remediation verified. |
| CloneBleed | 2026-06-04 | 5 | 5 | [GHSA-qfqv-42qw-vvwh](https://github.com/wekan/wekan/security/advisories/GHSA-qfqv-42qw-vvwh) | Published GHSA details and suggested remediation verified. |
| OIDCBleed | 2026-05-31 | 5 | 5 | [GHSA-mp7g-hj5q-gxhq](https://github.com/wekan/wekan/security/advisories/GHSA-mp7g-hj5q-gxhq) | Published GHSA details and suggested remediation verified. |
| ReadOnlyBleed | 2026-05-31 | 5 | 5 | [GHSA-6733-4wgq-8xvr](https://github.com/wekan/wekan/security/advisories/GHSA-6733-4wgq-8xvr) | Published GHSA details and suggested remediation verified. |
| WebhookBleed | 2026-05-31 | 4 | 4 | No matched published advisory | Advisory exists or is claimed but not matched to the published catalogue; retain pending verification. **Evidence-limited.** |
| FilePathBleed | 2026-05-27 | 4 | 4 | [GHSA-g6vm-7757-pr88](https://github.com/wekan/wekan/security/advisories/GHSA-g6vm-7757-pr88) | Published GHSA details verified; no explicit suggested-fix section/prose found. Review implied advice separately. |
| BFLABleed | 2026-05-19 | 5 | 5 | [GHSA-7w2h-g83c-jqrp](https://github.com/wekan/wekan/security/advisories/GHSA-7w2h-g83c-jqrp) | Published GHSA details and suggested remediation verified. |
| AuthBleed | 2026-05-07 11:39 EET | 5 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| AvatarBleed | 2026-05-03 13:57 EET | 5 | 5 | [GHSA-35j7-h385-2q9g](https://github.com/wekan/wekan/security/advisories/GHSA-35j7-h385-2q9g) | Published GHSA details and suggested remediation verified. |
| IntegrationBleed | 2026-02-24 15:09 EET | 5 | 5 | [GHSA-hc3x-hq3m-663q](https://github.com/wekan/wekan/security/advisories/GHSA-hc3x-hq3m-663q) | Published GHSA details and suggested remediation verified. |
| AnchorBleed | 2026-02-12 11:16 EET | 5 | 3 | No matched published advisory | No matching GHSA; supplied fix/contribution documented in Process. |
| FloppyBleed | 2026-01-24 18:30 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| SnowBleed | 2026-01-05 15:46 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| MegaBleed | 2025-12-26 18:39 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| SpaceBleed | 2025-11-02 03:29 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| FieldBleed | JVN: 2021-2025 Many fixed. | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| SocialBleed | 2023-05-11 19.14 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| AdminBleed | 2023-04-24 16.40 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| InvisibleBleed | 2023-04-24 03.35 EET | 2 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| ReactionBleed | 2023-02-28 12.36 EET | 5 | 3 | No matched published advisory | No matching GHSA; supplied fix/contribution documented in Process. |
| FileNameBleed | 2023-02-16 17.35 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| EmailBleed | 2021-01-26 12.42 EET | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| LDAPBleed | 2021-01-26 0:42 EET | 4 | 3 | No matched published advisory | No matching GHSA; supplied fix/contribution documented in Process. |
| DUEBleed | 2021-01-11 EET | 2 | 3 | No matched published advisory | No matching GHSA; supplied fix/contribution documented in Process. |
| BypassBleed | 2020-02-26 01:36 EET | 5 | 3 | No matched published advisory | No matching GHSA; supplied fix/contribution documented in Process. |
| UserBleed | 2018-06-12 | 5 | 3 | No matched published advisory | No matching GHSA; supplied fix/contribution documented in Process. |
| BruteBleed | 2018-06-12 | 1 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |
| FrameBleed | 2018-03-25 | 4 | 2 | No matched published advisory | No matching GHSA and no researcher-suggested fix documented; private/historical evidence may change this. **Evidence-limited.** |

## Audit again, 2026-11-18

Every one of the 149 rows of the contents page, and the row on each
vulnerability's own page, was checked again against the ranking above, using
the **92 published advisories** that GitHub's REST catalogue returned on this
date and the text of each one. A row's own advisory is the one in its CVE or
Process cell; an advisory named in Details is often a sibling's.

- **A GHSA added later:** every 3-star row whose Process says the report came
  without a GHSA was checked. ListLockAttachBleed (Furkan Derse) has none yet,
  so it stays at 3 and the GHSA is awaited. RedirectBleed, SourceBleed,
  LiveBleed, CasRaceBleed and MetricsBleed arrived as GHSAs on 2026-11-16 and
  were already 5.
- **Every row with its own GHSA** was checked for a suggested fix in the
  advisory. Two were still ranked as reports without one: AdminFieldBleed
  (Hama1cco), which states a suggested fix, is now 5; SamlSubjectBleed
  (alham-rizvi), whose remedy is implied by the OIDC fix rather than suggested,
  is now 4.
- **No stars:** AuthTraceBleed showed "-"; as a GitHub CodeQL finding fixed by
  xet7 it is 3, like the other code scanning entries.
- **Detail pages behind the index:** the main rows of the InputBleed (2, now 3),
  FieldBleed (4, now 2) and BruteBleed (1, now 2) pages still had their awards
  from before the first audit, which matched pages by date and so missed them.
  They now match the index and the inventory.
- The 32 entries added since the first audit are in the inventory above.

Index and page awards now agree for every row whose page has one. WebhookBleed
stays at 4 and evidence-limited, as recorded above: the advisories in its CVE
cell are those of IntegrationBleed, BFLABleed and AvatarBleed, its siblings.

## Verification and follow-up

Verified all 111 current index awards against this inventory, all 87 matching
name/date detail rows, and all 829 GoldStar.png references to the shared image. Report
subject matching was used for the fetched advisories; existing misplaced GHSA
links have not been rewritten as part of this star-only change. Remaining
historical/private report evidence and unmatched detail rows require follow-up,
but follow-up is not planned.

## Current focus

Current focus is at fixing any new GitHub advisories ASAP.
At the time this audit was done and fixes implemented to star count,
all advisories have already been fixed.

Icon/name audit: [Audit-Icons.md](Audit-Icons.md). Renamed from Audit.md on
2026-09-14; star counts are unchanged by this icon update.
