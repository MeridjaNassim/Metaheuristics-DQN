FROM node:12

RUN mkdir -p /var/www/
WORKDIR /var/www/

COPY ./backend /var/www/

RUN "export" "NODE_OPTIONS=--unhandled-rejections=warn"

RUN npm install
RUN npm run build


CMD "npm" "run" "develop"