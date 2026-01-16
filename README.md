# KanbanBoard

## Project Setup

```sh
npm install
```

```sh
npm run dev
```

## API Setup with Docker

This project requires the KanbanBoardAPI backend to function. You can set up the API using Docker.

### Prerequisites

- [Docker](https://www.docker.com/) must be installed on your system

### Running the API with Docker

1. Clone the KanbanBoardAPI repository:

```sh
git clone https://github.com/mmadej20/KanbanBoardAPI.git
cd KanbanBoardAPI
```

2. Build and run the Docker container:

```sh
docker-compose up -d
```

3. The API will be available at `http://localhost:8080` (or the port specified in the API's configuration)

For more details on the API project, refer to the [KanbanBoardAPI repository](https://github.com/mmadej20/KanbanBoardAPI).
