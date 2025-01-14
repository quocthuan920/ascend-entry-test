# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /www

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependenciess
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port that the Node.js application will listen on
EXPOSE 3000

# Start the Node.js application
CMD [ "npm", "start" ]