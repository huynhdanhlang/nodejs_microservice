FROM node

WORKDIR /app/products

COPY package.json .

COPY . .

EXPOSE 8002

CMD ["sh","-c", "npm install & npm run dev"]