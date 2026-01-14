# backend/Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json first (for caching)
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src

# Expose port
EXPOSE 3012

# Run in dev mode
CMD ["npm", "run", "dev"]
