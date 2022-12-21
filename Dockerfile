FROM node:16.13.1-alpine

WORKDIR /roc

COPY ./package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "node", "dist/app.js" ]
