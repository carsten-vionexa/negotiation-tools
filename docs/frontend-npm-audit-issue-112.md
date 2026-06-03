# Frontend npm audit findings for issue 112

Date: 2026-06-03

## Summary

The frontend audit reports 2 moderate findings. Both are caused by the same
transitive dependency chain:

- `next@16.2.6` depends on `postcss@8.4.31`.
- The PostCSS advisory affects versions `<8.5.10`.
- The separate Tailwind PostCSS dependency resolves to `postcss@8.5.14` and is
  not affected.

No dependency change was applied because the only complete `npm audit` fix is a
forced semver-major/breaking path reported by npm. A non-forced dry run would
only move `next` from `16.2.6` to `16.2.7`; registry metadata confirms that
`next@16.2.7` still depends on `postcss@8.4.31`, so that update would not
resolve the findings.

## Findings

| Package | Direct or transitive | Current version | Recommended fix version | Severity | Breaking upgrade required |
| --- | --- | --- | --- | --- | --- |
| `postcss` | Transitive via `next` | `8.4.31` | npm reports fix via `next@9.3.3` with `npm audit fix --force` | Moderate | Yes |
| `next` | Direct dependency | `16.2.6` | npm reports `next@9.3.3` as the audit fix target | Moderate | Yes |

## Command results

- `npm audit` reports GHSA-qx2v-qp2m-jg93 for `postcss <8.5.10`.
- `npm audit fix --dry-run` reports a non-forced package change to
  `next@16.2.7`, but the audit findings remain.
- `npm audit fix --force` would be required according to npm, and npm reports
  that it would install `next@9.3.3`, which is a breaking framework downgrade
  from the current `next@16.2.6`.
- `npm view next@16.2.6 dependencies` and `npm view next@16.2.7 dependencies`
  both show `postcss: 8.4.31`.

## Decision

Do not run `npm audit fix` for this issue. The available complete fix is not
small or low-risk, and the non-forced dry-run update does not resolve the
vulnerability. Track this separately until Next.js publishes a compatible
release that updates its bundled PostCSS dependency to a non-vulnerable version.
