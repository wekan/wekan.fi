# Hall of Fame Icon audit

Audit and changes completed: **2026-09-14**. Audited again: **2026-11-18**.

Updated the contents page and 108 vulnerability detail pages. Existing local
Font Awesome assets are reused; no CDN, new dependency or Internet access is
needed to display these icons. Each vulnerability has a unique combination of
black icons, followed by the red `fa-tint` bleed icon. Names are exposed as
accessible labels; individual decorative glyphs remain hidden from assistive
technology. Stars and security descriptions are unchanged.

Icon subjects were selected from the local vulnerability descriptions and report
actions. Combinations differentiate both attack surface and failure/action.
They are visual identifiers, not severity ratings.

Duplicate report names were clarified: `CasAccountMergeBleed` versus
`CasRaceBleed`, `FilePathBleed` versus `FileNameBleed`, and the attachment-storage
follow-up `MimeStorageBleed` versus `MimeBleed`. Modern detail-page `2026` suffixes
were normalized to the corresponding contents name. Historical import and position
history sub-findings retain distinct legacy identifiers. Existing URLs remain valid.

Reference: [Font Awesome 4.7 icon catalogue](https://fontawesome.com/v4/icons/).
Star methodology: [Audit-Stars.md](Audit-Stars.md).

| Vulnerability | Black icons (FA 4.7) | Meaning | Updated occurrences |
| --- | --- | --- | --- |
| AdminBleed | `fa-user`, `fa-level-up`, `fa-unlock` | user + level up + unlock | 2 |
| AdminFieldBleed | `fa-lock` | lock | 2 |
| AnchorBleed | `fa-anchor`, `fa-database`, `fa-eye` | anchor + database + eye | 2 |
| ArchiveBleed | `fa-archive`, `fa-columns` | archive + columns | 2 |
| AssignedBleed | `fa-user`, `fa-check-square-o`, `fa-pencil` | user + check square + pencil | 3 |
| AttachmentMigrationBleed | `fa-paperclip`, `fa-refresh`, `fa-unlock` | paperclip + refresh + unlock | 2 |
| AuthBleed | `fa-key`, `fa-clone`, `fa-exchange` | key + clone + exchange | 2 |
| AuthMethodBleed | `fa-id-badge`, `fa-search` | id badge + search | 2 |
| AuthTraceBleed | `fa-sign-in`, `fa-bug`, `fa-eye` | sign in + bug + eye | 2 |
| AuthorBleed | `fa-pencil`, `fa-user-secret`, `fa-history` | pencil + user secret + history | 4 |
| AvatarBleed | `fa-user-circle`, `fa-code`, `fa-shield` | user circle + code + shield | 4 |
| AvatarMimeBleed | `fa-user-circle`, `fa-file-code-o`, `fa-code` | user circle + file code + code | 2 |
| BFLABleed | `fa-road`, `fa-columns`, `fa-unlock` | road + columns + unlock | 4 |
| BackgroundBleed | `fa-picture-o`, `fa-paperclip` | picture + paperclip | 2 |
| BackupFileBleed | `fa-floppy-o`, `fa-paperclip`, `fa-code` | floppy + paperclip + code | 2 |
| BoardBleed | `fa-columns`, `fa-exchange`, `fa-unlock` | columns + exchange + unlock | 4 |
| BoardTitleRESTBleed | `fa-columns`, `fa-header`, `fa-road` | columns + header + road | 2 |
| BounceBleed | `fa-envelope`, `fa-ban` | envelope + ban | 2 |
| BruteBleed | `fa-envelope`, `fa-user`, `fa-search` | envelope + user + search | 2 |
| BypassBleed | `fa-key`, `fa-server`, `fa-unlock` | key + server + unlock | 2 |
| CacheBleed | `fa-hdd-o` | hdd | 2 |
| CalendarBleed | `fa-calendar`, `fa-upload`, `fa-lock` | calendar + upload + lock | 3 |
| CardPubSubBleed | `fa-sticky-note`, `fa-rss`, `fa-eye` | sticky note + rss + eye | 2 |
| CasAccountMergeBleed | `fa-id-card`, `fa-user`, `fa-compress` | id card + user + compress | 1 |
| CasRaceBleed | `fa-id-card`, `fa-exchange`, `fa-clock-o` | id card + exchange + clock | 4 |
| OidcRaceBleed | `fa-openid`, `fa-exchange`, `fa-clock-o` | OpenID + exchange + clock: CasRaceBleed's race, in the OIDC login | 4 |
| CasTokenBleed | `fa-ticket`, `fa-id-card` | ticket + id card | 2 |
| ChecklistBleed | `fa-check-square-o`, `fa-exchange`, `fa-columns` | check square + exchange + columns | 4 |
| ChecklistRESTBleed | `fa-check-square-o`, `fa-road`, `fa-unlock` | check square + road + unlock | 2 |
| ChecklistWriteBleed | `fa-check-square-o`, `fa-pencil`, `fa-lock` | check square + pencil + lock | 2 |
| ClaimBleed | `fa-id-card`, `fa-key`, `fa-exchange` | id card + key + exchange | 2 |
| CloneBleed | `fa-clone`, `fa-columns`, `fa-eye` | clone + columns + eye | 17 |
| CloudPanelBleed | `fa-cloud`, `fa-database` | cloud + database | 2 |
| CodeBleed | `fa-keyboard-o`, `fa-clock-o` | keyboard + clock | 2 |
| CommentBleed | `fa-comment`, `fa-trash`, `fa-lock` | comment + trash + lock | 4 |
| CommentBoundaryBleed | `fa-comment`, `fa-columns`, `fa-chain-broken` | comment + columns + chain broken | 2 |
| CommentWriteBleed | `fa-comment`, `fa-plus`, `fa-lock` | comment + plus + lock | 2 |
| CookieTokenBleed | `fa-key`, `fa-desktop`, `fa-eye` | key + desktop + eye | 2 |
| CopyBoardBleed | `fa-clone`, `fa-columns`, `fa-unlock` | clone + columns + unlock | 2 |
| CopyCardBleed | `fa-clone`, `fa-sticky-note`, `fa-unlock` | clone + sticky note + unlock | 2 |
| CopyIdentityBleed | `fa-clone` | clone | 2 |
| CopyListBleed | `fa-clone`, `fa-list`, `fa-unlock` | clone + list + unlock | 2 |
| CopySwimlaneBleed | `fa-clone`, `fa-bars`, `fa-unlock` | clone + bars + unlock | 2 |
| CrashBleed | `fa-download`, `fa-key`, `fa-exclamation-triangle` | download + key + exclamation triangle | 4 |
| CreateBleed | `fa-plus-square`, `fa-columns`, `fa-user-times` | plus square + columns + user times | 2 |
| CrossBoardExportBleed | `fa-download`, `fa-check-square-o`, `fa-user-secret` | download + check square + user secret | 2 |
| CursorBleed | `fa-database`, `fa-search`, `fa-eye` | database + search + eye | 2 |
| CustomFieldBleed | `fa-table`, `fa-pencil`, `fa-unlock` | table + pencil + unlock | 2 |
| DUEBleed | `fa-calendar`, `fa-user`, `fa-eye` | calendar + user + eye | 2 |
| DirectoryGroupBleed | `fa-users` | users | 2 |
| DirectoryInfoBleed | `fa-address-book`, `fa-sign-in` | address book + sign in | 2 |
| DnsBleed | `fa-globe`, `fa-server`, `fa-external-link` | globe + server + external link | 4 |
| DueDateBleed | `fa-calendar`, `fa-pencil`, `fa-unlock` | calendar + pencil + unlock | 2 |
| EmailBleed | `fa-envelope`, `fa-key`, `fa-eye` | envelope + key + eye | 1 |
| ErrorBleed | `fa-exclamation-triangle`, `fa-code`, `fa-eye` | exclamation triangle + code + eye | 2 |
| EscapeBleed | `fa-asterisk`, `fa-css3`, `fa-eraser` | asterisk + css3 + eraser | 4 |
| ExcelBleed | `fa-file-excel-o`, `fa-download`, `fa-unlock` | file excel + download + unlock | 4 |
| ExportBleed | `fa-download`, `fa-file-code-o`, `fa-code` | download + file code + code | 4 |
| ExportScopeBleed | `fa-download` | download | 2 |
| FieldBleed | `fa-table`, `fa-file-image-o`, `fa-code` | table + file image + code | 2 |
| FileNameBleed | `fa-file-text-o`, `fa-pencil`, `fa-code` | file text + pencil + code | 2 |
| FilePathBleed | `fa-paperclip`, `fa-folder-open`, `fa-eye` | paperclip + folder open + eye | 3 |
| FixDuplicateBleed | `fa-clone`, `fa-wrench`, `fa-unlock` | clone + wrench + unlock | 2 |
| FloppyBleed | `fa-floppy-o`, `fa-file-code-o`, `fa-shield` | floppy + file code + shield | 2 |
| FollowBleed | `fa-upload`, `fa-share`, `fa-server` | upload + share + server | 4 |
| FrameBleed | `fa-window-maximize`, `fa-hand-pointer-o`, `fa-code` | window maximize + hand pointer + code | 2 |
| GlobalBleed | `fa-globe`, `fa-eye`, `fa-unlock` | globe + eye + unlock | 2 |
| GroupLinkBleed | `fa-users`, `fa-link`, `fa-user-plus` | users + link + user plus | 2 |
| GuestBleed | `fa-user-plus`, `fa-columns`, `fa-eye` | user plus + columns + eye | 4 |
| HashBleed | `fa-key`, `fa-database`, `fa-eye` | key + database + eye | 4 |
| HistoryScopeBleed | `fa-history` | history | 2 |
| HookBleed | `fa-bullhorn`, `fa-plug` | bullhorn + plug | 2 |
| HookUrlBleed | `fa-plug`, `fa-link` | plug + link | 2 |
| HostnameBleed | `fa-globe`, `fa-asterisk`, `fa-check-square-o` | globe + asterisk + check square | 2 |
| IdentityBleed | `fa-asterisk`, `fa-exchange`, `fa-eraser` | asterisk + exchange + eraser | 4 |
| ImpersonateBleed | `fa-user-secret`, `fa-history`, `fa-download` | user secret + history + download | 4 |
| ImportBleed | `fa-upload`, `fa-users`, `fa-unlock` | upload + users + unlock | 2 |
| ImportLegacyBleed | `fa-upload`, `fa-archive`, `fa-unlock` | upload + archive + unlock | 2 |
| ImportPlacementBleed | `fa-file-archive-o`, `fa-columns`, `fa-random` | file archive + columns + random | 2 |
| InactiveBleed | `fa-user-times` | user times | 2 |
| InputBleed | `fa-code`, `fa-eraser`, `fa-keyboard-o` | code + eraser + keyboard | 4 |
| IntegrationBleed | `fa-plug`, `fa-server`, `fa-globe` | plug + server + globe | 2 |
| IntegrationFileBleed | `fa-plug`, `fa-paperclip`, `fa-server` | plug + paperclip + server | 2 |
| InvisibleBleed | `fa-comment-o`, `fa-eye-slash`, `fa-code` | comment + eye slash + code | 2 |
| InvitationBoardBleed | `fa-envelope`, `fa-columns`, `fa-lock` | envelope + columns + lock | 2 |
| InviteBleed | `fa-envelope`, `fa-key`, `fa-random` | envelope + key + random | 4 |
| InviteProfileBleed | `fa-envelope`, `fa-id-card`, `fa-pencil` | envelope + id card + pencil | 2 |
| JamBleed | `fa-user`, `fa-ban`, `fa-repeat` | user + ban + repeat | 4 |
| LDAPBleed | `fa-address-book`, `fa-certificate`, `fa-unlock` | address book + certificate + unlock | 2 |
| LdapBindBleed | `fa-sign-in` | sign in | 2 |
| LegacyAttachBleed | `fa-history`, `fa-paperclip`, `fa-file-code-o` | history + paperclip + file code | 2 |
| LinkedBoardActivitiesBleed | `fa-link`, `fa-columns`, `fa-history` | link + columns + history | 2 |
| LinkedWriteBleed | `fa-link`, `fa-pencil`, `fa-lock` | link + pencil + lock | 2 |
| ListLockAttachBleed | `fa-list`, `fa-lock`, `fa-paperclip` | list + lock + paperclip | 2 |
| ListLockBleed | `fa-list`, `fa-lock`, `fa-check-square-o` | list + lock + check square | 2 |
| ListLockBulkBleed | `fa-list`, `fa-lock`, `fa-clone` | list + lock + clone | 2 |
| ListLockMoveBleed | `fa-list`, `fa-lock`, `fa-exchange` | list + lock + exchange | 2 |
| ListWIPBleed | `fa-list`, `fa-tasks`, `fa-unlock` | list + tasks + unlock | 2 |
| LiveBleed | `fa-upload`, `fa-paperclip`, `fa-server` | upload + paperclip + server | 4 |
| LockoutBleed | `fa-key`, `fa-unlock`, `fa-repeat` | key + unlock + repeat | 4 |
| MailTitleBleed | `fa-envelope`, `fa-header`, `fa-code` | envelope + header + code | 2 |
| ManageBoardBleed | `fa-columns`, `fa-wrench`, `fa-user-secret` | columns + wrench + user secret | 2 |
| MegaBleed | `fa-cubes`, `fa-columns`, `fa-unlock` | cubes + columns + unlock | 22 |
| MembershipBleed | `fa-users`, `fa-eye`, `fa-unlock` | users + eye + unlock | 2 |
| MetricsBleed | `fa-bar-chart`, `fa-server`, `fa-user-secret` | bar chart + server + user secret | 4 |
| MigrationBleed | `fa-truck`, `fa-paperclip` | truck + paperclip | 2 |
| MigrationsBleed | `fa-database`, `fa-refresh`, `fa-unlock` | database + refresh + unlock | 2 |
| MigrationsBleed2 | `fa-database`, `fa-refresh`, `fa-pencil` | database + refresh + pencil | 2 |
| MimeBleed | `fa-upload`, `fa-file-code-o`, `fa-code` | upload + file code + code | 2 |
| MimeStorageBleed | `fa-file-code-o`, `fa-archive`, `fa-code` | file code + archive + code | 3 |
| MiniProfileBleed | `fa-id-badge`, `fa-eye`, `fa-unlock` | id badge + eye + unlock | 2 |
| MoveListBleed | `fa-list`, `fa-exchange`, `fa-unlock` | list + exchange + unlock | 2 |
| MoveStorageBleed | `fa-database`, `fa-exchange`, `fa-folder-open` | database + exchange + folder open | 2 |
| MutationBleed | `fa-pencil`, `fa-exchange`, `fa-lock` | pencil + exchange + lock | 2 |
| OIDCBleed | `fa-id-card`, `fa-users`, `fa-user-secret` | id card + users + user secret | 8 |
| OrgsTeamsBleed | `fa-building`, `fa-users`, `fa-unlock` | building + users + unlock | 2 |
| OwnerBleed | `fa-columns`, `fa-user`, `fa-flag` | columns + user + flag | 2 |
| ParentBleed | `fa-sitemap`, `fa-level-up`, `fa-eye` | sitemap + level up + eye | 4 |
| PassBleed | `fa-file-excel-o`, `fa-download`, `fa-chain-broken` | file excel + download + chain broken | 4 |
| PathBleed | `fa-user-circle`, `fa-folder-open`, `fa-pencil` | user circle + folder open + pencil | 4 |
| PatternBleed | `fa-asterisk`, `fa-desktop`, `fa-eraser` | asterisk + desktop + eraser | 4 |
| PortraitBleed | `fa-user-circle`, `fa-download`, `fa-unlock` | user circle + download + unlock | 4 |
| PositionHistoryBleed | `fa-undo`, `fa-columns`, `fa-chain-broken` | undo + columns + chain broken | 2 |
| PositionHistoryLegacyBleed | `fa-history`, `fa-sticky-note`, `fa-pencil` | history + sticky note + pencil | 2 |
| PrototypeBleed | `fa-sitemap`, `fa-bug` | sitemap + bug | 2 |
| ProxyBleed | `fa-server`, `fa-key`, `fa-user-secret` | server + key + user secret | 4 |
| PurgeBleed | `fa-columns`, `fa-trash`, `fa-chain-broken` | columns + trash + chain broken | 4 |
| RaceBleed | `fa-random`, `fa-trash`, `fa-clock-o` | random + trash + clock | 2 |
| RandomBleed | `fa-random`, `fa-database`, `fa-balance-scale` | random + database + balance scale | 4 |
| ReactionBleed | `fa-smile-o`, `fa-comment`, `fa-code` | smile + comment + code | 2 |
| ReadOnlyBleed | `fa-eye`, `fa-pencil`, `fa-table` | eye + pencil + table | 4 |
| RebindBleed | `fa-globe`, `fa-refresh`, `fa-server` | globe + refresh + server | 2 |
| RedirectBleed | `fa-user-circle`, `fa-share`, `fa-server` | user circle + share + server | 4 |
| RelayBleed | `fa-key` | key | 2 |
| RelicAvatarBleed | `fa-history`, `fa-user-circle`, `fa-download` | history + user circle + download | 4 |
| ReplyBleed | `fa-reply` | reply | 2 |
| RepointBleed | `fa-cogs`, `fa-share` | cogs + share | 2 |
| ResetBleed | `fa-key`, `fa-envelope`, `fa-repeat` | key + envelope + repeat | 2 |
| RevokeBleed | `fa-users`, `fa-ban`, `fa-eye` | users + ban + eye | 4 |
| RoleBleed | `fa-users`, `fa-table`, `fa-unlock` | users + table + unlock | 2 |
| RouteBleed | `fa-road`, `fa-asterisk`, `fa-check-square-o` | road + asterisk + check square | 4 |
| RuleBleed | `fa-cogs`, `fa-columns`, `fa-lock` | cogs + columns + lock | 2 |
| RuleButtonBleed | `fa-hand-pointer-o`, `fa-cogs`, `fa-lock` | hand pointer + cogs + lock | 2 |
| RulesBleed | `fa-cogs`, `fa-pencil`, `fa-unlock` | cogs + pencil + unlock | 2 |
| SamlReplayBleed | `fa-repeat` | repeat | 2 |
| SamlSubjectBleed | `fa-id-card` | id card | 1 |
| ScannerBleed | `fa-shield`, `fa-terminal`, `fa-upload` | shield + terminal + upload | 4 |
| SearchBleed | `fa-search`, `fa-database`, `fa-code` | search + database + code | 2 |
| SessionBleed | `fa-search`, `fa-key`, `fa-chain-broken` | search + key + chain broken | 2 |
| SheetColorBleed | `fa-file-excel-o`, `fa-paint-brush`, `fa-code` | file excel + paint brush + code | 2 |
| SignupBleed | `fa-user-plus`, `fa-toggle-off`, `fa-unlock` | user plus + toggle off + unlock | 4 |
| SnowBleed | `fa-snowflake-o`, `fa-database`, `fa-wrench` | snowflake + database + wrench | 2 |
| SocialBleed | `fa-users`, `fa-external-link`, `fa-key` | users + external link + key | 2 |
| SortBleed | `fa-sort`, `fa-columns`, `fa-user-secret` | sort + columns + user secret | 4 |
| SourceBleed | `fa-upload`, `fa-link`, `fa-code` | upload + link + code | 4 |
| SpaceBleed | `fa-rocket`, `fa-paperclip`, `fa-code` | rocket + paperclip + code | 14 |
| SpliceBleed | `fa-file-text-o`, `fa-scissors`, `fa-code` | file text + scissors + code | 4 |
| StaleBleed | `fa-user-times`, `fa-history`, `fa-eye` | user times + history + eye | 4 |
| StampBleed | `fa-check-square-o`, `fa-tag`, `fa-sign-in` | check square + tag + sign in | 2 |
| SubtaskDepositBleed | `fa-sitemap`, `fa-inbox`, `fa-lock` | sitemap + inbox + lock | 2 |
| SubtaskExportBleed | `fa-sitemap`, `fa-download`, `fa-eye` | sitemap + download + eye | 2 |
| SwimlaneBleed | `fa-bars`, `fa-plus`, `fa-lock` | bars + plus + lock | 2 |
| SyncBleed | `fa-refresh` | refresh | 2 |
| SyncLDAPBleed | `fa-address-book`, `fa-refresh`, `fa-unlock` | address book + refresh + unlock | 2 |
| TenantBleed | `fa-building`, `fa-users`, `fa-wrench` | building + users + wrench | 3 |
| TokenAuditBleed | `fa-key`, `fa-user-secret`, `fa-eye-slash` | key + user secret + eye slash | 2 |
| TokenBleed | `fa-key`, `fa-plus`, `fa-unlock` | key + plus + unlock | 5 |
| TransitBleed | `fa-globe`, `fa-exchange`, `fa-server` | globe + exchange + server | 4 |
| TrayBleed | `fa-bell`, `fa-inbox` | bell + inbox | 2 |
| UnassignedArchiveBleed | `fa-archive`, `fa-user-times` | archive + user times | 2 |
| UnassignedAttachBleed | `fa-paperclip`, `fa-user-times`, `fa-trash` | paperclip + user times + trash | 2 |
| UploadBleed | `fa-cloud-upload`, `fa-paperclip`, `fa-user-secret` | cloud upload + paperclip + user secret | 2 |
| UploadPathBleed | `fa-upload`, `fa-folder-open`, `fa-level-up` | upload + folder open + level up | 4 |
| UserBleed | `fa-user`, `fa-key`, `fa-eye` | user + key + eye | 2 |
| UserSearchBleed | `fa-search`, `fa-user`, `fa-asterisk` | search + user + asterisk | 2 |
| VisibilityBleed | `fa-eye`, `fa-columns`, `fa-unlock` | eye + columns + unlock | 2 |
| WatchBleed | `fa-eye`, `fa-bell`, `fa-unlock` | eye + bell + unlock | 2 |
| WebhookBleed | `fa-external-link`, `fa-server`, `fa-lock` | external link + server + lock | 8 |
| WhereBleed | `fa-database`, `fa-terminal`, `fa-code` | database + terminal + code | 4 |
| WipeBleed | `fa-files-o`, `fa-trash`, `fa-unlock` | files + trash + unlock | 4 |
| ZipBleed | `fa-file-archive-o`, `fa-folder-open`, `fa-level-up` | file archive + folder open + level up | 4 |
| ZipBombBleed | `fa-bomb`, `fa-file-archive-o` | bomb + file archive | 2 |

## Verification

Checked every chosen class against the installed Font Awesome stylesheet, checked
unique combinations regardless of icon order, and updated title/table/list icon
occurrences together. Added missing local Font Awesome stylesheet references to newer pages.
All 109 pages have icons: 139 unique identifiers across 438 icon groups.
Validated generated markup and compared all star counts with the pre-change files.
Live browser rendering was not tested.

## Audit again, 2026-11-18

Every row of the contents page (149) was checked again against the rules
above: its black icons come first and the red `fa-tint` last, each class exists
in the local `font-awesome/css/font-awesome.min.css`, the icon cell holds icons
only, inside one `role="img"` group labelled with the vulnerability's name, no
two vulnerabilities share a combination regardless of order, and the page of
the vulnerability shows the same icons with the local stylesheet linked.

- The 37 rows added since the first audit, RaceBleed back to AuthTraceBleed, are
  in the table above.
- AuthTraceBleed had `fa-sign-in` alone, the same combination as LdapBindBleed.
  It is now `fa-sign-in`, `fa-bug`, `fa-eye` (a login fixture, the stack traces
  it disclosed): unique, and its page, which had no icons and no Font Awesome
  stylesheet, now has both.
- SamlSubjectBleed's icons had no accessible group; they are now one
  `role="img"` labelled SamlSubjectBleed.
- The table's own spelling: EmailBleed (was Emailbleed, as the contents page
  once did), and "folder open" and "toggle off" in Meaning, which the first
  audit's generator had shortened to "folderpen" and "toggleff".
- Updated occurrences are counted again over every page: 513 labelled icon
  groups, 177 identifiers, 177 unique combinations. Rows not on the
  contents page are the legacy sub-findings named on a vulnerability's page.

Star counts are recorded in [Audit-Stars.md](Audit-Stars.md); only the stars
listed there changed in this audit. Live browser rendering was not tested.
