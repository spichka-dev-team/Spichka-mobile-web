#!/bin/sh
# Ensure runtime ownership for .next and public so the non-root user can write cache
set -e

# Only attempt chown when running as root. On some host-mounted filesystems (Windows)
# chown is not permitted and will fail; in that case we skip chown and try to fix
# permissions with chmod so the non-root user can still write where possible.
IS_ROOT=0
if [ "$(id -u)" -eq 0 ] ; then
  IS_ROOT=1
fi

if [ -d /app/.next ]; then
  echo "[entrypoint] fixing permissions for /app/.next"
  if [ "$IS_ROOT" -eq 1 ]; then
    # Use numeric uid/gid to avoid relying on name resolution
    chown -R 1001:1001 /app/.next || true
  else
    echo "[entrypoint] not root: skipping chown for /app/.next"
  fi
  chmod -R u+rwX /app/.next || true
fi

if [ -d /app/public ]; then
  echo "[entrypoint] fixing permissions for /app/public"
  if [ "$IS_ROOT" -eq 1 ]; then
    chown -R 1001:1001 /app/public || true
  else
    echo "[entrypoint] not root: skipping chown for /app/public"
  fi
  chmod -R u+rwX /app/public || true
fi

exec "$@"
