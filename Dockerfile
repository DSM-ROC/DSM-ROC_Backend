FROM node:16.13.1-alpine

WORKDIR /roc

COPY ./package*.json ./

COPY . . 

RUN npm i -g yarn \
    && npm i -g typescript \
    && yarn install

EXPOSE 8080

ENV TZ=Asia/Seoul

CMD ['yarn', 'build' && 'yarn', 'start']
