#!/bin/bash

echo "🚀 Hupscale GitHub Pages Deployment Script"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
    echo "✅ gh-pages installed"
    echo ""
fi

# Build the project
echo "🔨 Building the website..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Deploy to GitHub Pages
    echo "🚀 Deploying to GitHub Pages..."
    npx gh-pages -d out
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Deployment successful!"
        echo ""
        echo "🌐 Your website will be live at:"
        echo "   https://YOUR_USERNAME.github.io/Hupscale/"
        echo ""
        echo "⏱️  Note: It may take 2-5 minutes for changes to appear."
        echo ""
    else
        echo ""
        echo "❌ Deployment failed!"
        echo "   Please check the error messages above."
        echo ""
    fi
else
    echo ""
    echo "❌ Build failed!"
    echo "   Please fix the errors above and try again."
    echo ""
fi
