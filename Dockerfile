# Stage 1: Build the React app
FROM node:18 AS build

# Accept VITE_BASE_URL as build-time argument
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app (VITE_BASE_URL used here)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files to Nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
