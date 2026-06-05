#!/bin/sh
set -e
git pull
docker compose up -d --build
echo "Deployed. Logs: docker compose logs -f"
