FROM node:14.21.2-slim as build

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "/usr/src/app/"]
RUN yarn install --peer

COPY . .
RUN cd crm && yarn install --peer
RUN cd proxy && yarn install --peer
RUN npm i pm2 -g
RUN cd crm && yarn build

CMD [ "yarn", "start"]