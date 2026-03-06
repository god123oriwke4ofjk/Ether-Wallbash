#!/bin/bash
set -e

function notify_error {
  notify-send -u critical -i dialog-error "Wallbash Update Error" "$1"
  exit 1
}

trap 'notify_error "Error on line $LINENO: $BASH_COMMAND"' ERR

STATE_FILE="$HOME/.local/state/hyde/staterc"
TARGET="/var/www/ether/dist/wallbash.js"

if ! command -v notify-send >/dev/null 2>&1; then
  echo "Error: notify-send (libnotify) is not installed." >&2
  echo "Please install it with: sudo pacman -S libnotify" >&2
  exit 1
fi

if [ ! -f "$STATE_FILE" ]; then
  notify_error "State file not found: $STATE_FILE"
fi

if [ ! -d "/var/www/ether/dist" ]; then
  notify_error "/var/www/ether/dist does not exist.\nRun the main setup script first."
fi

THEME=$(grep '^HYDE_THEME=' "$STATE_FILE" | head -n1 | sed 's/HYDE_THEME="//; s/"$//')
if [ -z "$THEME" ]; then
  notify_error "Could not parse HYDE_THEME from $STATE_FILE"
fi

THEME_FILE="$HOME/.config/hyde/themes/$THEME/$THEME.ts"
if [ ! -f "$THEME_FILE" ]; then
  notify_error "Theme file not found: $THEME_FILE"
fi

cat "$THEME_FILE" > "$TARGET"


