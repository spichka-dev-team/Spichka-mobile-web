# Simple Makefile
# used for "development" (dev) purposes and as aliases

#NAMED_COMPOSE_FILE=docker-compose.dev.yml
#NAMED_COMPOSE_FILE=docker-compose.yml

#NAMED_COMPOSE_FILE=docker-compose.staging.yml
NAMED_COMPOSE_FILE=docker-compose.prod.yml

up: ## Start Containers
	@docker-compose -f $(NAMED_COMPOSE_FILE) up -d --build

down: ## Stop Containers
	@docker-compose -f $(NAMED_COMPOSE_FILE) down

build: ## Build Containers
	@docker-compose -f $(NAMED_COMPOSE_FILE) build --no-cache

logs: ## Show logs of Containers
	@docker-compose -f $(NAMED_COMPOSE_FILE) logs -f

.PHONY: up down build logs