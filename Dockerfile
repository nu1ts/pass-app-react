FROM node:21-alpine AS base

WORKDIR /app

FROM node:21-alpine AS build
ARG BUILD_CONFIGURATION=Production

WORKDIR /src

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM alpine:latest AS final

COPY --from=build /src/dist /app

WORKDIR /app

CMD ["npx", "vite", "preview"]