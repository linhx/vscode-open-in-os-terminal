import * as vscode from 'vscode';
import cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const command = 'openInOsTerminal.open';
  const openTerminalCommand =
    process.platform === 'win32' ? 'start cmd' : 'x-terminal-emulator';

  const commandHandler = (val: any) => {
    const stat = fs.statSync(val.fsPath);
    const dir = stat.isFile() ? path.dirname(val.fsPath) : val.fsPath;
    const subprocess = cp.spawn(openTerminalCommand, {
      cwd: dir,
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
