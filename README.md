# Page Service

The `page_service` is a Node.js microservice designed to manage pages in a social media application. This service integrates with Eureka for service discovery and connects to a MongoDB database for data management.

To view all services for this social media system, lets visit: `https://github.com/goddie9x?tab=repositories&q=social`

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

## Setup

### 1. Clone the Repository

Clone the `page_service` repository and its required utilities:

```bash
git clone https://github.com/goddie9x/social_page_service.git
cd page_service
```

### 2. Clone Utility Package

Clone the required `social_utils` package as a subdirectory in the project root:

```bash
git clone https://github.com/goddie9x/social_utils.git utils
```

### 3. Configuration

Set up environment variables in a `.env` file in the root directory with the following configuration:

```dotenv
PORT=3009
MONGODB_URI=mongodb://goddie9x:your_password_here@mongo:27017/page
APP_NAME=page-service
HOST_NAME=page-service
IP_ADDRESS=page-service
EUREKA_DISCOVERY_SERVER_HOST=discovery-server
EUREKA_DISCOVERY_SERVER_PORT=8761
```

> **Note**: Replace `your_password_here` with your actual MongoDB password.

## Package Installation

Ensure dependencies are installed by running:

```bash
npm install
```

## Running the Service Locally

To start the service locally:

```bash
npm start
```

The service will run on `http://localhost:3009` by default.

## Running with Docker

1. **Dockerfile**:

   Create a `Dockerfile` in the project root with the following content:

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /usr/src/app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 3009
   CMD ["npm", "start"]
   ```

2. **Build and Run the Docker Container**:

   Build and start the Docker container:

   ```bash
   docker build -t page-service .
   docker run -p 3009:3009 --env-file .env page-service
   ```

## Running with Docker Compose

To run `page_service` within a Docker Compose setup, include the following service definition:

```yaml
page-service:
  image: page-service
  build:
    context: .
  ports:
    - 3009:3009
  environment:
    - PORT=3009
    - MONGODB_URI=mongodb://goddie9x:your_password_here@mongo:27017/page
    - APP_NAME=page-service
    - HOST_NAME=page-service
    - IP_ADDRESS=page-service
    - EUREKA_DISCOVERY_SERVER_HOST=discovery-server
    - EUREKA_DISCOVERY_SERVER_PORT=8761
  depends_on:
    - mongo
    - discovery-server
  networks:
    - social-media-network
```

Start all services with Docker Compose:

```bash
docker-compose up --build
```

## Accessing the Service

Once running, the `page_service` will be available at `http://localhost:3009`.

---

This setup will allow you to start, configure, and deploy the `page_service` in both local and containerized environments.

### Useful Commands

- **Stop Containers**: Use `docker-compose down` to stop all services and remove the containers.
- **Restart Containers**: Run `docker-compose restart` to restart the services without rebuilding the images.

This setup enables seamless orchestration of the social media microservices with an API Gateway for managing external client requests.

## Contributing

Contributions are welcome. Please clone this repository and submit a pull request with your changes. Ensure that your changes are well-tested and documented.

## License

This project is licensed under the MIT License. See `LICENSE` for more details.