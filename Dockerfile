FROM cypress/included:latest

WORKDIR /app


COPY package.json package-lock.json ./
COPY cypress ./cypress
COPY cypress.config.js ./
 

RUN npm install 


CMD ["cypress", "run"]