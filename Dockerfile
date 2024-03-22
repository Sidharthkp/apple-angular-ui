FROM node:latest as build

WORKDIR /usr/local/app

# Copy your Angular project files into the container
COPY ./ /usr/local/app

# Install project dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

#use official nginx image as base image
FROM nginx:latest

COPY --from=build /usr/local/app/dist/apple /usr/share/nginx/html

# Expose the port your app runs on
EXPOSE 80