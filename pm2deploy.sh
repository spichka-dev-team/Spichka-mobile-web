#!/bin/bash

set -e  # Остановить скрипт при ошибке

echo "🔄 Pulling latest changes..."
if git pull; then
  echo "✅ Git pull successful"
else
  echo "❌ Git pull failed"
  exit 1
fi

echo "📦 Installing dependencies..."
if npm install; then
  echo "✅ npm install successful"
else
  echo "❌ npm install failed"
  exit 1
fi

echo "🏗️ Building project..."
if npm run build; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

echo "🚀 Starting app with PM2..."
if pm2 start npm --name "spichka-web-mobile" -- run start; then
  echo "✅ App started with PM2"
else
  echo "❌ PM2 start failed"
  exit 1
fi

echo "🎉 All steps completed successfully!"
