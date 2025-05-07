# Stage 1: Build the React app
FROM node:18 AS build

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
