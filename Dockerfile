FROM node:16.13.1-alpine

COPY ./package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "node", "build/app.js" ]
