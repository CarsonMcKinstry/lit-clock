FROM node:16-alpine AS runner

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app

copy --chown=node::node .next .next
copy --chown=node::node ./data.json ./data.json
copy --chown=node::node ./package.json ./package.json
copy --chown=node::node ./yarn.lock ./yarn.lock
copy --chown=node::node ./next.config.js ./next/config.js
copy --chown=node::node ./node_modules ./node_modules

USER node

EXPOSE 3000

CMD ["yarn", "start"]