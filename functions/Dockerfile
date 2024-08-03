# Use the official Node.js image from Docker Hub
FROM node:18-alpine

# Install Firebase CLI
RUN npm install -g firebase-tools

# Create and change to the app directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install app dependencies
RUN npm install

# Expose port 5001 for Firebase functions emulator
EXPOSE 5001

# Command to run Firebase emulators
CMD ["firebase", "emulators:start", "--only", "functions"]