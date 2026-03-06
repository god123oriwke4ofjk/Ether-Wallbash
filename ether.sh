#!/usr/bin/env bash
[[ $HYDE_SHELL_INIT -ne 1 ]] && eval $(hyde-shell init)
source "${HYDE_STATE_HOME}/staterc"
TARGET="/var/www/ether/dist/wallbash.js"

function notify_error {
  notify-send -u critical -i dialog-error "Wallbash Update Error" "$1"
  exit 1
}

trap 'notify_error "Error on line $LINENO: $BASH_COMMAND"' ERR

[[ ! -d "/var/www/ether/dist" ]] && notify_error "/var/www/ether/dist does not exist."

if [[ -z "${HYDE_THEME}" ]]; then
  notify_error "Could not parse HYDE_THEME from \"${HYDE_STATE_HOME}/staterc\""
fi

THEME_FILE="${HYDE_CONFIG_HOME}/themes/${HYDE_THEME}/${HYDE_THEME}.ts"
if [ ! -f "$THEME_FILE" ]; then
  notify_error "Theme file not found: $THEME_FILE"
fi

cat "${THEME_FILE}" > "${TARGET}"
