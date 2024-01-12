import * as vscode from 'vscode';
import cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  const command = 'openInOsTerminal.open';
  const openTerminalCommand =
    process.platform === 'win32' ? 'start cmd' : 'x-terminal-emulator';

  const commandHandler = (val: any) => {
    const subprocess = cp.spawn(openTerminalCommand, {
      cwd: val.fsPath,
      detached: true,
      shell: true,
      stdio: 'ignore',
    });
    subprocess.unref();
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(command, commandHandler)
  );
}

export function deactivate() {}
