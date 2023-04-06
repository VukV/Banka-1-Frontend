FROM node:16
RUN npm install -g @angular/cli
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]


# docker build -t si-banka-1/frontend .
# docker run -p 4200:4200 <image-id>
