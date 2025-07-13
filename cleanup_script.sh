#!/bin/bash

echo "🧹 Starting complete portfolio cleanup..."

# Remove all problematic files and directories
echo "Removing old components..."
rm -rf components/

echo "Removing old node modules..."
rm -rf node_modules/

echo "Removing lock files..."
rm -f package-lock.json
rm -f yarn.lock

echo "Removing Next.js cache..."
rm -rf .next/
rm -rf out/

echo "Removing old source directory..."
rm -rf src/

echo "Removing old build files..."
rm -rf build/

# Keep only essential directories
echo "✅ Keeping: app/, public/, lib/, .github/"

echo "🎯 Cleanup complete! Now:"
echo "1. Replace your files with the artifacts above"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo "4. Push to GitHub!"

echo ""
echo "📁 Expected file structure:"
echo "Portfolio/"
echo "├── app/"
echo "│   ├── globals.css"
echo "│   ├── layout.tsx"
echo "│   └── page.tsx"
echo "├── lib/"
echo "│   └── utils.ts"
echo "├── .github/workflows/"
echo "│   └── deploy.yml"
echo "├── public/"
echo "├── package.json"
echo "├── next.config.js"
echo "├── tailwind.config.js"
echo "├── tsconfig.json"
echo "└── postcss.config.js"