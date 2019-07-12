FROM node:12

WORKDIR /app

RUN npm install -g graphql-cli prisma nodemon

COPY package*.json /app

RUN npm install

COPY . /app

RUN chmod -R +x ./docker-scripts/

EXPOSE 4000

ENTRYPOINT [ "./docker-scripts/entrypoint.sh" ]