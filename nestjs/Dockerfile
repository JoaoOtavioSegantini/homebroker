FROM node:20.4.0-alpine3.18

WORKDIR /home/node

RUN npm i -g @nestjs/cli@10.1.10

RUN apk add --no-cache bash

USER node

CMD [ "tail", "-f", "/dev/null" ]