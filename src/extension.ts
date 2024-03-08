import * as vscode from 'vscode';
import cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const command = 'openInOsTerminal.open';
  const isWindows = process.platform === 'win32';
  const openTerminalCommand = isWindows ? 'start cmd' : 'x-terminal-emulator';

  const commandHandler = (val: any) => {
    let dir;
    if (isWindows) {
      dir = val.fsPath;
    } else {
      const stat = fs.statSync(val.fsPath);
      dir = stat.isFile() ? path.dirname(val.fsPath) : val.fsPath;
    }
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
