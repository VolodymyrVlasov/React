FROM node:alpine

WORKDIR /app
COPY package.json .
COPY . .

CMD ["npm", "install"]
CMD ["npm", "run", "start"]