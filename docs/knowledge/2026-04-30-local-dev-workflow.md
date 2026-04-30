# Local Development Workflow

- **Goal:** Run the development server persistently.
- **Command:** `Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "C:\Users\Admin\Documents\AIOpenCode\my-project" -WindowStyle Hidden`
- **Context:** Used to start the Next.js server in the background on Windows without agent timeout constraints.
- **Verification:** Check `Get-NetTCPConnection -LocalPort 3000` to confirm server status.
