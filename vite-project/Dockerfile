# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build script to generate the 'dist' folder
RUN npm run build

# Command to keep the container running (optional)
CMD ["echo", "Frontend build complete."]
