# Poliglot for VS Code

In-editor support for [Poliglot](https://poliglot.io) matrix specs — diagnostics, hover, go-to-definition, and completion for `.ttl` and `.rq` files.

This extension is a thin Language Server Protocol client. All language intelligence lives in the [`plgt`](https://github.com/poliglot-io/plgt-cli) CLI's `plgt lsp` server, which the extension launches on activation.

Status: **alpha**. The Poliglot platform is in private beta.

## What you get

- **Diagnostics** on `.ttl` and `.rq` files: predicate hallucination, namespace violations, dangling cross-references, SHACL violations, `script://` resolution errors. Same checks as `plgt validate`.
- **Hover** on any prefixed name → shows `rdfs:label`, definition, type, and where it's defined.
- **Go to definition** → jumps to the file:line where a term is declared (local matrix or any installed dependency).
- **Completion** on `prefix:` → all terms in that namespace.

## Requirements

- The `plgt` CLI must be installed and on `PATH`. The extension launches `plgt lsp` as its server.
- Your project must be initialized: a `poliglot.yml` at the workspace root, dependencies installed via `plgt install`.

## Configuration

| Setting | Default | Description |
| --- | --- | --- |
| `plgt.serverCommand` | `plgt` | Command used to launch the CLI. Set if the binary isn't named `plgt` or isn't on `PATH`. The extension invokes `<command> lsp`. Machine-scoped so a committed workspace `.vscode/settings.json` cannot point this at an arbitrary binary. |

## Building from source

```sh
npm install
npm run bundle             # esbuild bundle
npm run package            # produces a .vsix
```

Install the resulting `.vsix` via the VS Code "Install from VSIX..." command in the Extensions view.

## Development

```sh
npm install
npm run watch              # esbuild --watch
npm run typecheck          # tsc --noEmit
npm run lint
```

## JetBrains and other editors

JetBrains IDEs (IntelliJ IDEA, PyCharm, GoLand, etc.) support LSP through the official LSP plugin. Point it at `plgt lsp` and register `.ttl` / `.rq` as the file types. A first-class JetBrains plugin is future work.

## Documentation

- IDE reference: <https://poliglot.io/docs/ide/vscode>
- Full docs: <https://poliglot.io/docs>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All contributors must sign the [Poliglot Contributor License Agreement](https://poliglot.io/cla) before their first PR is merged.

Bugs and feature requests go through GitHub Issues; security issues use [private security advisories](https://github.com/poliglot-io/plgt-vscode/security/advisories/new) — see [SECURITY.md](SECURITY.md).

## License

[Apache License 2.0](LICENSE) · © Poliglot Inc.
