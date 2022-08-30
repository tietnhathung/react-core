FROM node:16.17.0 as build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
COPY .env.docker .env
RUN npm run build

FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]