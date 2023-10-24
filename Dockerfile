FROM nginx:1.17.9-alpine AS build

ENV WORKDIR /usr/src/app

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build ${WORKDIR}/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]