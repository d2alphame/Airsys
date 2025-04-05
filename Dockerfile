FROM node:16.20.2
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT [ "npm", "run", "start" ]