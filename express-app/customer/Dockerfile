FROM node

WORKDIR /app/customer

COPY package.json .

COPY . .

EXPOSE 8001

CMD ["sh","-c", "npm install & npm run dev"]