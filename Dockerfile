# Use the official Node.js 14 image as the base image
FROM node:18.14-alpine3.17 as development
RUN apk add --no-cache bash git openssh-client

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN mkdir -p -m 0700 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

# Install project dependencies
RUN npm install -g pnpm
RUN --mount=type=ssh pnpm install
# Copy the entire project directory to the working directory
COPY . .

# Build the Next.js project
# RUN pnpm build

# Expose the port that the Next.js app will run on
EXPOSE 3001

# Set the command to run the Next.js app
CMD ["pnpm", "dev"]
