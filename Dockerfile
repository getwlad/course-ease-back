
FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


COPY start.sh .

RUN chmod +x start.sh

EXPOSE 3000


CMD ["./start.sh"]
