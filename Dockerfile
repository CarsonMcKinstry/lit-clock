FROM node:16-alpine AS runner

RUN apk update
RUN apk add openssl

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
COPY --chown=node::node . .

USER node

EXPOSE 3000

CMD ["yarn", "start"]