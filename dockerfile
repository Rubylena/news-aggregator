# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
