#!/bin/bash
# Run this script on your Mac after placing icon-1024.png in the project root.
# It copies the icon to the Xcode asset catalog and lets @capacitor/assets
# generate all required sizes automatically.
#
# Usage:
#   cp /path/to/your/brenda_icon.png ./icon-1024.png
#   bash scripts/set-ios-icon.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/icon-1024.png"

if [ ! -f "$SRC" ]; then
  echo "Error: $SRC not found. Place your 1024x1024 PNG there first."
  exit 1
fi

APPICONSET="$ROOT/ios/App/App/Assets.xcassets/AppIcon.appiconset"

# Copy as the single App Store icon (Xcode 14+ single-size approach)
cp "$SRC" "$APPICONSET/AppIcon-512@2x.png"
echo "✓ iOS App Store icon updated (1024×1024)"

# Optional: use @capacitor/assets to generate all legacy sizes too
if npx --yes @capacitor/assets --version &>/dev/null 2>&1; then
  mkdir -p "$ROOT/assets"
  cp "$SRC" "$ROOT/assets/icon.png"
  npx @capacitor/assets generate --ios
  echo "✓ All iOS icon sizes generated via @capacitor/assets"
fi

echo ""
echo "Next steps:"
echo "  npm run build && npx cap sync ios && npx cap open ios"
