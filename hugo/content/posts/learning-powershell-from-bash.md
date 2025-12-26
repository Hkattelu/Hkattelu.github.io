---
title: "Learning PowerShell from Bash"
date: 2025-11-01T00:00:00-05:00
draft: false
slug: "learning-powershell-from-bash"
tags: ["PowerShell", "Bash", "Programming"]
categories: ["blog"]
---

For the longest time, i have been using windows + linux because I refuse to pay $2000 for a macbook. I stand by that decision.

One thing that has changed, is I have gotten tired of using linux bash. WSL for windows works, but it becomes quite frustrating as you
try to manage multiple environments or installations between the real windows and windows subsystem. I figured my life would be much
simpler if I bit the bullet and just learned how to use powershell.

It turns out, this is also a great idea for a blog post\!

Firstly, here is this comparison table for quickly grasping the differences in syntax and command philosophy between **Bash** (common in Linux/macOS) and **PowerShell** (native to Windows).


## Bash vs. PowerShell Command Equivalents

| Action / Concept | Bash Command (Linux/macOS) | PowerShell Command (Windows) | Key Difference |
| :--- | :--- | :--- | :--- |
| **List Files** | `ls`, `dir` | `Get-ChildItem` (`gci`, `ls` is an alias) | PowerShell uses **Cmdlets** (`Verb-Noun` structure). |
| **Change Directory** | `cd /path/to/folder` | `Set-Location /path/to/folder` (`cd` is an alias) | N/A |
| **Display File Content** | `cat filename.txt` | `Get-Content filename.txt` (`cat` is an alias) | PowerShell's output is *objects*, not just text strings. |
| **Copy File** | `cp source destination` | `Copy-Item source destination` | N/A |
| **Move File** | `mv source destination` | `Move-Item source destination` | N/A |
| **Remove File** | `rm filename.txt` | `Remove-Item filename.txt` | PowerShell often requires confirmation for deletions. |
| **Find Command Location**| `which <command>` | `Get-Command <command>` | PowerShell finds cmdlets, functions, and external executables. |
| **Define Variable** | `MYVAR="value"` | `$MyVar = "value"` | Variables start with `$` in PowerShell. No spaces around `=`. |
| **Access Variable** | `$MYVAR` | `$MyVar` | N/A |
| **Loop (Generic)** | `for i in {1..5}; do ... done` | `1..5 \|; ForEach-Object { ... }` | PowerShell heavily uses the **pipeline** (`\|`). |
| **Execute External Program** | `command arg1 arg2` | `& "C:\\path\\to\\app.exe"` | Use the **Call Operator** (`&`) for reliable external execution. |
| **Pipe Output** | `command1 \|; command2` | `command1 \|; command2` | Pipeline concept is identical, but PowerShell pipes *objects*. |
| **Filter Output (Grep)** | `... \|; grep "pattern"` | `... \|; Where-Object { $_ -match "pattern" }` | PowerShell filters properties of **objects**, not just text. |
| **Format Output (Awk)** | `... \|; awk '{print $1}'` | `... \|; Select-Object -ExpandProperty PropertyName` | PowerShell objects have structured properties. |
| **Exit Script** | `exit 0` | `exit 0` | N/A |

-----

### Scripting

The most critical difference you'll encounter is that **Bash deals in streams of text**, while **PowerShell deals in structured objects**.

* **Bash Example (Text Stream):**

  ```bash
  # ls outputs text; grep filters that text; less pages the resulting text.
  ls -l | grep "Aug" | less
  ```

* **PowerShell Example (Object Stream):**

  ```powershell
  # gci outputs a FileSystem Object; Where-Object filters the object's properties (like LastWriteTime); Select-Object creates a new object containing only Name and length.
  Get-ChildItem | Where-Object { $_.LastWriteTime -ge (Get-Date).AddDays(-30) } | Select-Object Name, Length
  ```

Understanding the **object pipeline** is the key to transitioning to PowerShell scripting. The commands themselves do take a bit of time to learn, but just keep the "Verb-Noun" structure in mind.

### Error handling: PowerShell vs Bash

Another place Bash and PowerShell differ is error handling. Bash is built around numeric exit codes and text streams; PowerShell exposes non-terminating vs terminating errors and rich exceptions on objects. Here are the common patterns and some short examples.

- Bash (exit codes, `set -e`, traps):

  - Commands return an integer exit code: `0` means success, any non-zero is an error.
  - Use `set -euo pipefail` near the top of scripts to fail early on errors and undefined variables.
  - Use `trap 'handler' ERR` to run cleanup or logging when a command fails.

  Example:

  ```bash
  #!/usr/bin/env bash
  set -euo pipefail
  trap 'echo "Error on line $LINENO (exit $?)" >&2; exit 1' ERR

  # safe-ish copy
  cp important.file /some/dest/
  echo "copied"
  ```

  - For pipelines, `pipefail` is important so the script sees failures inside a piped sequence.

- PowerShell (exceptions, `try/catch`, `$ErrorActionPreference`):

  - PowerShell has *terminating* and *non-terminating* errors. Many cmdlets emit non-terminating errors by default (they write to `$Error` but don't throw). Use `-ErrorAction Stop` or set `$ErrorActionPreference = 'Stop'` to convert them into exceptions you can catch.
  - Use `try { } catch { } finally { }` to handle exceptions and do cleanup.
  - For external native programs, check `$LASTEXITCODE` (the numeric exit code) or `$?` (boolean success of last operation).

  Example (cmdlet error handling):

  ```powershell
  $ErrorActionPreference = 'Stop'
  try {
    Copy-Item -Path 'C:\temp\missing.txt' -Destination 'C:\dest\' -ErrorAction Stop
  } catch {
    Write-Error "Copy failed: $_"
    exit 1
  }
  ```

  Example (external program):

  ```powershell
  & 'C:\Program Files\tool\tool.exe' --do-thing
  if ($LASTEXITCODE -ne 0) {
    Write-Error "tool.exe failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
  }
  ```

Best practices summary:

- For Bash: use `set -euo pipefail`, trap `ERR` for logging/cleanup, and check exit codes for external commands when needed.
- For PowerShell: prefer `try/catch` around important operations, set `$ErrorActionPreference = 'Stop'` (or use `-ErrorAction Stop` on specific cmdlets), and inspect `$LASTEXITCODE` for native executables.

Both ecosystems let you write robust scripts — the mental model differs (text+exit-code vs objects+exceptions), so pick the idiom that matches the environment and be explicit about how errors are handled.

---

And honestly, that's basically it!

I found that powershell is actually really powerful with the object strcuture - particularly for writing long .ps1 scripts with good error handling that can be run on double click.

There is one other topic worth discussing - which is package installation. Currently I use **Chocolatey** for package installation, and occasionally **Winget**. I found that these are prettty good for whatever I need in place of apt-get!
