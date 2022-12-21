FROM node:16.13.1-alpine

WORKDIR /roc

COPY ./package*.json ./

COPY . . 

RUN npm i -g yarn

RUN yarn

EXPOSE 8080

ENV TZ=Asia/Seoul

CMD ['yarn', 'build' && 'yarn', 'start']
