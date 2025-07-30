#mention the base image for app to run
FROM node:20-alpine AS builder

#mention the working directory the files would be there location /app
WORKDIR /app

#copy both packages for dependency installatiom
COPY package.json package-lock.json

#run npm ci which mean clean install which deletes or cleans node modules and install all dependencies
RUN npm ci 

#copy files include whole code base first dot specifies source and second means destination source is host and destination would be container
COPY . .

#building ts code into js or doing compilation here rather running for development
RUN npm run build

# Stage 2: Production
FROM node:20-slim AS production

WORKDIR /app

# Only copy compiled JS and runtime deps
COPY package*.json ./

#clean install node modules and omit dev dependencies use both package json files to track deps error when both mismatch versions
RUN npm ci --omit=dev

#copy the full compiled code which would be on dist as typescript outdir would be on dist folder
COPY --from=builder /app/dist ./dist

# Set entrypoint to run the app
CMD ["node", "dist/index.js"]


#use docker build --target builder -t appImageName - for development only build image and run container
#use docker build . -t appImageName - for production full image with multi stage builds and with runnable less size image 

