#!/bin/bash

echo "🔧 Starting Netlify build process..."

# Set platform-specific environment variables
export npm_config_target_platform=linux
export npm_config_target_arch=x64
export npm_config_cache=/tmp/.npm

echo "📦 Installing dependencies..."
npm ci --include=optional --verbose

echo "🔍 Checking for @parcel/watcher binary..."
if [ ! -f "node_modules/@parcel/watcher-linux-x64-glibc/watcher.linux-x64-glibc.node" ]; then
    echo "⚠️  Linux binary missing, trying to install manually..."
    npm install --no-save @parcel/watcher-linux-x64-glibc@2.5.1 --force || echo "❌ Manual install failed, continuing..."
fi

echo "🧹 Cleaning Gatsby cache..."
npx gatsby clean

echo "🏗️  Building Gatsby site..."
npx gatsby build

echo "✅ Build complete!"
