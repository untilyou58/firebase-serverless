FROM node:10.14.1-alpine

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install -qy

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]