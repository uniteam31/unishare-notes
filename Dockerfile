FROM node:22

# При деплое ОБЯЗАТЕЛЬНО указывать все ENV через Jenkins
# Ставится в pipeline на Jenkins
ARG BRANCH=dev
ARG API_URL

# INSTALL PACKAGES
RUN apt -yqq update \
    && apt -yqq install git curl nginx \
    && apt clean

# NGINX CONFIGURE
RUN rm /etc/nginx/sites-enabled/default
COPY nginx/default /etc/nginx/sites-enabled

# INSTALL YARN
RUN corepack enable
RUN yarn init -2

# SETUP .NMPRC
COPY .npmrc /root/

# CHECKOUT
RUN git clone https://github.com/uniteam31/unishare-notes.git
WORKDIR /unishare-notes
RUN git fetch --all
RUN git pull
RUN git checkout ${BRANCH}

# INSTALL DEPS
RUN yarn install
RUN API_URL=${API_URL} yarn build

RUN rm -rf /var/www/html
RUN mv build /var/www/

# EXPOSE PORT AND START NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
