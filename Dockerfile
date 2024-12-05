FROM node:16 as development 
# WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=4096"
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start-dev"]

 

FROM node:16 as production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
# ARG NODE_ENV 
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi

COPY . .
EXPOSE 4000
CMD ["npm", "start"]