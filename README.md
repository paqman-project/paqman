# PAQMAN - Parameter Query Manual

## What is PAQMAN?
TODO

## Team
Pacman is being developed as part of a project at the Offenburg University of Applied Sciences by Nadine Weber (MI7), Nicola Jäger (UN6) and Leon Schmidt (UN6).

## Development

### Project setup
- Backend: **Go v1.16**
- Frontend: **React JS v17.0.1 _(via `create-react-app`)_**
    - CSS framework: **Tailwind CSS**

### Run dev environment
- Run the backend with `$ go run .` within `server/` &rarr; listens on `0.0.0.0:3002`
- Run the frontend with `$ npm run start` within `frontend/` &rarr; listens on `0.0.0.0:5000` with hot reloading

### Manual build
- Backend (inside `server/`)
    - Install Go dependencies: `$ go get -d -v ./...`
    - Build Go binary: `$ CGO_ENABLED=1 go install -a -ldflags '-linkmode external -extldflags "-static"' .`
- Frontend (inside `frontend/`)
    - Install NPM dependencies: `$ npm install`
    - Build React frontend: `$ npm run build` &rarr; Static files in `build/`

### Docker build
- Build image: `$ docker build -t <your-tag> .`
- Start a container: `$ docker-compose up -d` or `$ docker run --name paqman -p "<external-port>:3002" -v "<your-config>:/config.json:ro" -v "<your-db>:/db.sqlite" <your-tag> [<options>]`

There is also a prebuild docker image at `registry.git.leon.wtf/paqman/paqman:latest`