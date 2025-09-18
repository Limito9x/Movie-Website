FROM node:22

WORKDIR /app

# Cài dependencies trước để cache tốt hơn
COPY package.json package-lock.json ./
RUN npm install

# Mount code từ host vào container
COPY . .
# (sẽ cấu hình trong docker-compose.yml)

EXPOSE 3001

CMD ["npm", "run", "dev"]