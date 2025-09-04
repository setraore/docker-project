FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY angular.json tsconfig*.json ./
COPY src ./src
RUN npm run build -- --configuration production

FROM nginx:1.27-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/entrypoint.d/40-gen-config.sh /docker-entrypoint.d/40-gen-config.sh
RUN chmod +x /docker-entrypoint.d/40-gen-config.sh
COPY --from=build /app/dist/frontend/ /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;" ]