FROM node:latest as build
WORKDIR /usr/local/app
COPY .. /usr/local/app/
RUN npm install
ARG configuration
RUN npm run build -- --configuration=$configuration


FROM nginx:latest as prod
COPY --from=build /usr/local/app/dist/bank /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]


# docker build -t banka-1/frontend .
# docker run -p 4200:80 <image-id>

# docker images (lista sve image)

# docker login harbor.k8s.elab.rs -u <username>

# docker build -t harbor.k8s.elab.rs/banka-1/frontend:latest .
# docker push harbor.k8s.elab.rs/banka-1/frontend:latest

# docker pull harbor.k8s.elab.rs/banka-1/frontend:latest
