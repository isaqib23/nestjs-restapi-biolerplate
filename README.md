# 🚀 NestJS Starter Kit v2

A lightweight, feature-rich foundation for building scalable NestJS applications with REST APIs.

## 📋 Overview

This starter kit provides a monolithic REST API architecture designed to get you up and running quickly while maintaining best practices. As a GitHub Template Repository, you can [use it as a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) for new projects.

## ✨ Features

We keep the starter kit lightweight while including essential functionality:

| Feature | Implementation | Status |
|---------|---------------|--------|
| ORM Integration | TypeORM | ✅ |
| Database Migrations | TypeORM | ✅ |
| Logging | Winston | ✅ |
| Request Validation | class-validator | ✅ |
| Pagination | SQL offset & limit | ✅ |
| Docker Support | Dockerfile & Compose | ✅ |
| Dev Containers | VS Code integration | ✅ |
| API Documentation | Auto-generated OpenAPI | ✅ |

Additional developer-friendly features:
- Prettier code formatting
- Husky commit-linting hooks
- Package import sorting
- Docker Compose for database dependencies

## 🔧 Installation

```bash
# Install dependencies
npm install

# Create environment configuration
cp .env.template .env
# Edit .env with your environment variables
```

## 🏃‍♂️ Running the Application

### Local Development

Prerequisites:
- PostgreSQL server running

```bash
# Development mode
npm run start

# Watch mode (auto-reload on changes)
npm run start:dev

# Production mode
npm run start:prod
```

### Using Docker

```bash
# Build the Docker image
docker build -t my-nestjs-app .

# Run as a container
docker run -p 3000:3000 --volume $(pwd):/usr/src/app --env-file .env my-nestjs-app

# Or use Docker Compose (recommended)
docker compose up
```

## 📊 Database Migrations

```bash
# Generate a new migration
npm run migration:generate --name=CreateUsers

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# Using Docker
docker compose exec app npm run migration:run
```

## 🏗️ Project Architecture

```
│ .env                  # Environment configuration
│ src/
│├── app.module.ts      # Root application module
│├── app.controller.ts  # Root controller
│├── app.service.ts     # Root service
│├── modules/           # Feature modules
││ ├── module/          # Domain-specific module
││ │   ├── controllers/ # Handle HTTP requests and responses
││ │   ├── dtos/        # Data Transfer Objects for request/response
││ │   ├── decorators/  # Custom decorators
││ │   ├── constants/   # Business logic constants
││ │   ├── helpers/     # Helper functions for services
││ │   ├── entities/    # Database models
││ │   ├── repositories/# Data access layer
││ │   ├── services/    # Business logic
││ │   └── module.module.ts
││ └── shared/          # Shared functionality
││     ├── acl/         # Access control
││     ├── configs/     # Environment configuration
││     ├── dtos/        # Shared DTOs
││     ├── errors/      # Custom error definitions
││     ├── filters/     # Exception filters
││     ├── logger/      # Logging functionality
││     └── middlewares/ # HTTP middlewares
├── migrations/         # Database migrations
├── docs/               # Documentation
└── test/               # End-to-end tests
```
