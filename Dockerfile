FROM cypress/included:latest

WORKDIR /app


COPY package.json package-lock.json ./
#COPY cypress ./cypress
#COPY cypress.config.js ./
 

#RUN npm install 


#CMD ["cypress", "run"]

RUN npm ci



RUN apt-get update && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    bash&& \
    npm install cypress --save-dev

# Cypress config
ENV CYPRESS_CONFIG_FILE="cypress.config.js"
ENV CYPRESS_RECORD_KEY="your_record_key"

CMD ["sleep", "infinity"]
