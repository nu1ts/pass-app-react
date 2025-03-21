FROM node:21-alpine AS base

ARG APP_UID=1000
RUN addgroup -g $APP_UID tsugroup && adduser -D -u $APP_UID -G tsugroup tsuuser

USER root
RUN mkdir /app && chown -R tsuuser:tsugroup /app

USER tsuuser
WORKDIR /app

FROM node:21-alpine AS build
ARG BUILD_CONFIGURATION=production

WORKDIR /src

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM alpine:latest AS final

COPY --from=build /src/dist /app

WORKDIR /app

USER root
RUN chown -R tsuuser:tsugroup /app
USER tsuuser

CMD ["npx", "vite", "preview"]