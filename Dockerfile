# Step 1: Use an official Node runtime as a parent image
FROM node:18-alpine AS build

# Step 2: Install pnpm
RUN npm install -g pnpm

# Step 3: Set the working directory
WORKDIR /app

# Step 4: Copy the package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Step 5: Install dependencies
RUN pnpm install

# Step 6: Copy the rest of the application code
COPY . .

# Step 7: Build the application
RUN pnpm run build

# Step 8: Use an official Nginx image to serve the built files
FROM nginx:alpine

# Step 9: Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 10: Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 11: Expose the port Nginx will serve on
EXPOSE 80

# Step 12: Start Nginx
CMD ["nginx", "-g", "daemon off;"]