FROM node:12-alpine

ADD src /app/src
ADD package.json /app
ADD server.ts /app
ADD tsconfig.json /app

RUN cd /app; npm i -G yarn; yarn

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

WORKDIR "/app"
CMD [ "npm", "start" ]