FROM node:21-alpine
WORKDIR /app
RUN npm install pnpm -g
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

CMD ["pnpm", "run", "start"]