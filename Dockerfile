FROM node:14.17.4

  LABEL maintainer=lva
  RUN mkdir -p /usr/src/app
  WORKDIR /usr/src/app
  COPY package.json /usr/src/app/
  RUN yarn config set registry https://registry.npmmirror.com -g
  RUN yarn
  RUN yarn global add pm2@4.5.6
  # RUN pm2 install pm2-intercom
  COPY . /usr/src/app
 
  EXPOSE 3333
  CMD ["bash", "pm2.sh"]