# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package management files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy everything from the root into the container!
COPY . .

# Build the app for production
RUN npm run build

# Expose the app's port
EXPOSE 3000

# Start the app in preview mode
CMD ["npm", "run", "preview"]