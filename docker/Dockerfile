FROM nginx:alpine

LABEL maintainer=18003554931@163.com version=1.0 name=ming-blog

COPY /docker/default.conf /etc/nginx/conf.d/default.conf
COPY /dist /var/www/dist

EXPOSE 443 80