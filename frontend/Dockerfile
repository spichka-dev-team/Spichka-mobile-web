# Use the official Node.js runtime as the base image
FROM node:18-alpine AS base

# Install runtime deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies layer
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --production=false

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production runner (uses Next standalone output)
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy only what's needed from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
## Ensure nextjs user owns runtime files so it can write cache and static files
RUN chown -R 1001:1001 /app/.next /app/public || true

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh || true

EXPOSE 3000
ENV PORT=3000

# Run as non-root user
USER nextjs

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "server.js"]
