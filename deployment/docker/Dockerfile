FROM node:10.15.1

# Create app directory
WORKDIR /usr/src

# Install app deps
COPY package*.json ./

RUN npm install

RUN npm install -g apollo

# Bundle app source
COPY . .

RUN npm run build

CMD [ "node", "dist/index.js" ]
