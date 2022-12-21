FROM node:16.13.1-alpine

WORKDIR /roc

COPY ./package.json ./

RUN yarn

RUN yarn build

COPY . .

CMD [ "node", "dist/app.js" ]
