FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
ENV PORT=2000
EXPOSE 2000
CMD ["node", "src/server.js"]