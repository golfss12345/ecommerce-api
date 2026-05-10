# Use a multi-stage build: build with dev deps, run with a minimal production image
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Install build deps deterministically
COPY package*.json ./
RUN npm install

# Copy sources and build
COPY . .
RUN npm run build

# Production image: smaller attack surface, no dev deps, non-root user
FROM node:20-bullseye-slim AS runner

WORKDIR /app
ENV NODE_ENV=development
ENV PORT=3000
ENV DATABASE_URL=postgres://postgres:Qwerty1123!@db:5432/ecommerce_db
ENV JWT_SECRET=u2z6ZX664Ea5DKalJpMmNmYdddWlJgesfJx0ZA1XlV0
ENV JWT_EXPIRES_IN=1h

# Create a non-root user
RUN groupadd --gid 1001 app && useradd --uid 1001 --gid 1001 --no-create-home --shell /usr/sbin/nologin app

# Copy built artifacts and package files, install only production deps
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev

# Use non-root user
USER app

EXPOSE 3000
CMD ["node", "dist/main.js"]