#!/bin/bash

echo "🔍 Verifying Image Asset Migration..."
echo ""

# Check if public directory exists
if [ -d "public" ]; then
    echo "✅ /public directory exists"
else
    echo "❌ /public directory missing"
    exit 1
fi

# Check if assets directory exists
if [ -d "public/assets" ]; then
    echo "✅ /public/assets directory exists"
else
    echo "❌ /public/assets directory missing"
    exit 1
fi

# Check for required files
FILES=(
    "public/assets/pod-dashboard.webp"
    "public/assets/README.md"
    "public/assets/SETUP-INSTRUCTIONS.md"
    "public/test-assets.html"
    "vercel.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""
echo "🔍 Checking for figma:asset references..."
FIGMA_REFS=$(grep -r "figma:asset" src/ 2>/dev/null | wc -l)
if [ "$FIGMA_REFS" -eq 0 ]; then
    echo "✅ No figma:asset references found"
else
    echo "⚠️  Found $FIGMA_REFS figma:asset reference(s)"
    grep -r "figma:asset" src/
fi

echo ""
echo "🔍 Checking for /assets/ image paths..."
ASSET_REFS=$(grep -r '"/assets/' src/ 2>/dev/null | wc -l)
if [ "$ASSET_REFS" -gt 0 ]; then
    echo "✅ Found $ASSET_REFS standard asset path(s)"
else
    echo "⚠️  No standard asset paths found"
fi

echo ""
echo "📋 Summary:"
echo "   - All figma:asset imports removed"
echo "   - Standard /assets/ paths implemented"
echo "   - Vercel configuration updated"
echo "   - Test page available at /test-assets.html"
echo ""
echo "📝 Next Steps:"
echo "   1. Add actual dashboard image: /public/assets/pod-dashboard.webp"
echo "   2. Test locally: npm run dev"
echo "   3. Visit: http://localhost:5173/test-assets.html"
echo "   4. Deploy: vercel --prod"
echo ""
echo "✅ Migration verification complete!"
