# Urban Fracture — updated development source

Snapshot date: 2026-11-13
Source commit: e5c34791e95eb59f321f71ed31ad0cb1c3c707e2
Source branch: audit/permanent-qa-infrastructure

This archive contains every tracked file from the current development checkout:
editable game source and runtime assets, regression tests, QA tools, repair logs,
and tracked evidence. The original README.md is retained; this file describes
the current delivery. No gameplay code was changed to create this package.

## Run the game

The editable source is in dist/. No compilation or npm installation is required
to play. Install Python 3, open a terminal in this folder, and run:

    python -m http.server 8000 --directory dist

Open http://localhost:8000 in a desktop browser. Use HTTP rather than opening
index.html directly. See the game UI for keyboard and controller commands.

## Upload to a new, empty GitHub repository

Extract this archive first. Upload the contents of the Urban-Fracture folder,
not the ZIP file. Keep dist/, tests/, tools/, qa/, reports, and documentation
in their existing relative locations. For this large collection of files,
use GitHub Desktop or Git from the extracted folder.

With Git installed, create an empty GitHub repository, then run:

    git init
    git add .
    git commit -m "Import updated Urban Fracture development source"
    git branch -M main
    git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
    git push -u origin main

Replace the URL with your own repository URL. These instructions create a new
repository; they do not describe replacing an existing repository's history.
No upload, publication, or remote modification was performed by this delivery.

## Tests and dependencies

See QA242-RUNBOOK.md, qa/system242/, tools/fighter-render/package.json,
and the individual tools' instructions. The game itself has no npm dependency.
Node/Python test runners and pinned rendering test dependencies must be installed
separately. node_modules, native test binaries, browser installations, and Python
environments are not included. Some existing audit utilities still refer to the
original local Git/Python locations; this package does not claim all audit tools
are portable to a fresh machine.

This is a source snapshot, not a Git history export. Original historical commits
are not included. Missing historical receipts must remain explicitly UNAVAILABLE;
strict release gates must remain blocked where their required evidence is absent.

## Current status and limitations

All repairs through UF-RENDER-027 and the UF-AUDIT-028 documentation are retained.
The permanent QA system is proposed, not implemented. Start with
reports-permanent-qa-audit/QA_REPORT.md and COMBAT_REPAIR_LOG.md.

UF-RENDER-025/027 performance holds are NOT CLEARED. This is the latest development
snapshot, not a fully certified stable release. The latest audit passed validator
self-tests (6/6) and runtime smoke, but scene smoke and the asset checker failed.
No gameplay, rendering, or full regression run was repeated merely to package it.

The audit found 6,460 original export paths unavailable in the working project,
primarily authoring/reference/history content. All 1,675 original runtime dist/
paths are present. This ZIP includes the complete current tracked snapshot; it
does not restore the missing original files or include arbitrary untracked files.

The isolated-contract-fixture under reports-permanent-qa-audit is deliberately
synthetic negative-test evidence, not a valid game release certificate.

PACKAGE-MANIFEST.json identifies every original snapshot file by byte size and
SHA-256. Packaging adds only this guide, the manifest, and a minimal .gitignore.
The .git directory and original Git branch/history metadata are not included.
