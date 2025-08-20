FROM nginx:1.25-alpine

# Replace default nginx conf
RUN rm -f /etc/nginx/conf.d/default.conf || true
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install curl for healthchecks and diagnostics
RUN apk add --no-cache curl

# Small healthcheck using curl
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD curl -fsS http://127.0.0.1/ || exit 1