#!/bin/bash
set -e

# Capture the absolute repo root before pnpm changes CWD
REPO_ROOT="$(pwd)"

echo "Repo root: $REPO_ROOT"
echo "Building Vyakti Parichay frontend..."

cd "$REPO_ROOT/artifacts/vyakti-parichay"
npx vite build --config vite.config.ts --outDir "$REPO_ROOT/dist"

echo "Build complete. Output in $REPO_ROOT/dist"
