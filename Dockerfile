# Build Go backend
FROM golang:1.16 AS go-builder
WORKDIR /go/src/app
COPY server/ .
RUN go get -d -v ./...
RUN CGO_ENABLED=0 go install -a -ldflags '-extldflags "-static"' .


# Transpile React frontend to static files
FROM node:15 AS react-builder
WORKDIR /tmp
COPY frontend/ .
RUN npm install
RUN npm run build


# Collect builds in scratch image
FROM alpine:latest
LABEL maintainer="Nadine Weber, Nicola Jäger, Leon Schmidt"
WORKDIR /app
# Copy compiled go binary
COPY --from=go-builder /go/bin/paqman-backend ./paqman-backend
# Copy static frontend files
COPY --from=react-builder /tmp/build ./frontend/build
# Copy example config
COPY server/config.docker.json ./config.json

#VOLUME /config.json
EXPOSE 3002

ENTRYPOINT ["/app/paqman-backend"]
