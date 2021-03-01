FROM node:14.16.0-alpine3.13

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies before copying the source.
# This ensures better utilization of docker layer caching
COPY package*.json ./

# npm ci should be faster than npm install and would not overwrite the package*.json files.
# only=production option would not install any devDependencies
RUN npm ci --only=production

# Bundle app source
COPY ./src/ ./src/

# Run the container as a nonroot user
RUN addgroup --gid 2000 --system hello-node && adduser --uid 1001 --system --ingroup hello-node hello-node

USER hello-node

EXPOSE 3000
CMD [ "node", "./src/index.js" ]
