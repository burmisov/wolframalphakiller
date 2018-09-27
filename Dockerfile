FROM node:8

ADD . /usr/wolframalphakiller

WORKDIR /usr/wolframalphakiller

COPY . .

RUN npm install

EXPOSE 8888

CMD ["npm", "start"]