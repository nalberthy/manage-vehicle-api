FROM        node:20.18.1-slim

EXPOSE      3000

RUN         apt-get update \
            && apt-get install -y libssl-dev procps \
            && apt-get clean

WORKDIR     /app

ENV         TZ=UTC

ENTRYPOINT ["/bin/sh", "-c" , "npm run migrate:deploy && npm run generate && npm run start"]
