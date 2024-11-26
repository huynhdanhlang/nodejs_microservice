FROM node

WORKDIR /app/shopping

COPY package.json .

COPY . .

EXPOSE 8003

CMD ["sh","-c", "npm install & npm run dev"]