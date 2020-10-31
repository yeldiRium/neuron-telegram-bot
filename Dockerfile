FROM node:15-alpine
WORKDIR /usr/app

COPY package.json /usr/app/
COPY package-lock.json /usr/app
RUN npm ci

COPY . /usr/app

CMD ["npm", "run", "start"]
