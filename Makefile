# Simple Makefile
# used for "development" (dev) purposes and as aliases

up: ## Start Containers
	@docker-compose up --build -d
#	@docker-compose up -d

down: ## Stop Containers
	@docker-compose down

build: ## Build Containers
	@docker-compose build --no-cache

logs: ## Show logs of Containers
	@docker-compose logs -f

.PHONY: up down build logs