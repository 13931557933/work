# 自定义的基础镜像，里面包含alpine node 和创建的文件夹
# FROM registry.k8x.cn/shidx/node:v1.1 as build
# RUN mkdir -p /home/Client
# WORKDIR /home/Client
# COPY . /home/Client
# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
# RUN cnpm i && cnpm run build
FROM nginx
RUN mkdir -p /usr/share/nginx/html
ADD file /usr/share/nginx/html
