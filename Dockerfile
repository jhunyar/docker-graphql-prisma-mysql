
# ---- Base Node ----
FROM node:12
# set working directory
WORKDIR /app
# install global packages
RUN npm install -g graphql-cli prisma nodemon
# copy project file
COPY package.json ./
 
# ---- Dependencies ----
# FROM base AS dependencies
# install ALL node_modules, including 'devDependencies'
RUN npm install
 
# ---- Dev ----
# FROM base AS dev
# copy app sources
COPY . /app
# make docker-scripts executable
RUN chmod -R +x ./docker-scripts/
# expose port and define CMD
EXPOSE 4000
# Set docker-scrips as entrypoint
ENTRYPOINT [ "./docker-scripts/entrypoint.sh" ]