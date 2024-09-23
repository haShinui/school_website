# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to cache layer if dependencies don't change
COPY package.json package-lock.json /app/

# Install dependencies and check funding
RUN npm install && npm fund

# Copy the rest of the app code
COPY . /app/

# Run npm fund again after copying all files
RUN npm fund

# Build the React app
RUN npm run build

# Expose the port that React uses
EXPOSE 3000

# Serve the build with a simple HTTP server
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
