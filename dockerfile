# Use the official Node.js Alpine image as the base image
FROM node:20.11.1-alpine

# Create a directory for the application
WORKDIR /api

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]