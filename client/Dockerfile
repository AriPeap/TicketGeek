FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ENV WATCHPACK_POLLING true

CMD [ "npm", "run", "dev" ]