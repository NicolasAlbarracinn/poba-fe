# Stage 1: Build the application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy application files
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Default command to run the server
CMD ["nginx", "-g", "daemon off;"]