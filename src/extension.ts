// VS Code extension: launches the Poliglot LSP server.
//
// Configuration knob `plgt.serverCommand` (default: "plgt") names the CLI
// command on PATH. The extension invokes `<serverCommand> lsp` to start
// the server on stdio and registers it for .ttl (turtle) and .rq (sparql)
// files. All language features (diagnostics, hover, definition,
// completion) come from the server — this client is a thin launcher.

import { workspace, ExtensionContext } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: ExtensionContext): void {
  const config = workspace.getConfiguration("plgt");
  const command = config.get<string>("serverCommand", "plgt");

  const serverOptions: ServerOptions = {
    command,
    args: ["lsp"],
    transport: TransportKind.stdio,
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "file", language: "turtle" },
      { scheme: "file", language: "sparql" },
    ],
    synchronize: {
      // Watch poliglot.yml + the per-mode lockfiles under .matrix/deps/ so the server
      // can re-run validation when deps change. The lockfile layout is per-workspace
      // (`<slug>.lock`) or `_registry.lock` for registry-resolve mode, all under
      // `.matrix/deps/`; the single-glob `**/.matrix/deps/*.lock` matches all variants.
      fileEvents: [
        workspace.createFileSystemWatcher("**/poliglot.yml"),
        workspace.createFileSystemWatcher("**/.matrix/deps/*.lock"),
      ],
    },
  };

  client = new LanguageClient(
    "plgt",
    "Poliglot",
    serverOptions,
    clientOptions,
  );

  client.start();
  context.subscriptions.push({
    dispose: () => {
      if (client) {
        void client.stop();
      }
    },
  });
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
