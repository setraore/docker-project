#!/bin/sh
set -eu
API_BASE_URL="${API_BASE_URL:-http://localhost:8080/api}"
mkdir -p /usr/share/nginx/html/assets
cat > /usr/share/nginx/html/assets/config.json <<EOF
{
  "apiBaseUrl": "${API_BASE_URL}"
}
EOF
