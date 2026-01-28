# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static single-page web app that runs a single-elimination knock-out tournament to determine the user's favorite country flag. Deployed via GitHub Pages at fun-with-country-flags.github.io.

## Development

No build tools, bundler, or package manager. The app is plain HTML/CSS/JS — open `index.html` directly in a browser to run it.

## Architecture

- **index.html** — Page shell: title, controls (show/hide country names toggle), progress bar container, and `#app` mount point.
- **main.js** — All application logic in a single file:
  - `flags` array (100+ countries, each with `name`, `emoji`, and two-letter `code`).
  - Windows OS detection: on Windows (which doesn't render flag emojis), flags are loaded as `<img>` from `flagcdn.com`; on other platforms native emoji is used.
  - Tournament engine: single-elimination bracket with bye handling for odd counts. State is held in module-level variables (`currentRound`, `nextRound`, `eliminated`, `matchIndex`, `roundNumber`).
  - `renderMatch()` drives the UI — shows two flags per match, or the final results (winner + top 5 ranking) when complete.
  - Arrow key navigation (left/right) as alternative to button clicks.
- **style.css** — Responsive layout, max-width 800px, card-based match display, progress bar styling.
