#!/bin/bash

# Spichka Mobile Web Deployment Script
# This script pulls the latest changes, builds and runs the application

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is available
if ! command -v git &> /dev/null; then
    print_error "Git is not installed or not available in PATH"
    exit 1
fi

# Check if docker and docker-compose are available
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not available in PATH"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed or not available in PATH"
    exit 1
fi

# Determine docker-compose command
DOCKER_COMPOSE_CMD="docker-compose"
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
fi

print_status "Using $DOCKER_COMPOSE_CMD"

# Step 1: Pull latest changes from git (skip if running in CI/CD)
if [ -z "$CI" ]; then
    print_status "Pulling latest changes from git..."
    if git pull origin main; then
        print_success "Successfully pulled latest changes"
    else
        print_error "Failed to pull changes from git"
        exit 1
    fi
else
    print_status "Running in CI/CD environment, skipping git pull"
fi

# Step 2: Stop existing containers
print_status "Stopping existing containers..."
$DOCKER_COMPOSE_CMD down || print_warning "No containers were running"

# Step 2.5: Remove old docker networks (if any remain)
print_status "Cleaning up old Docker networks..."
docker network prune -f || print_warning "Could not clean up networks"

# Step 3: Remove old images to free up space (optional, comment out if you want to keep them)
print_status "Cleaning up old Docker images..."
docker image prune -f || print_warning "Could not clean up images"

# Step 4: Build and start the application
print_status "Building and starting the application..."
if $DOCKER_COMPOSE_CMD up --build -d; then
    print_success "Application built and started successfully"
else
    print_error "Failed to build and start the application"
    exit 1
fi

# Step 5: Show container status
print_status "Checking container status..."
$DOCKER_COMPOSE_CMD ps

# Step 6: Show logs (last 20 lines)
print_status "Showing recent logs..."
$DOCKER_COMPOSE_CMD logs --tail=20 spichka-app

print_success "Deployment completed! 🎉"
print_status "Application is running on http://localhost:3000"
print_status "To view logs: $DOCKER_COMPOSE_CMD logs -f spichka-app"
print_status "To stop: $DOCKER_COMPOSE_CMD down"

# Health check
print_status "Performing health check..."
sleep 10
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Health check passed - application is responding"
else
    print_warning "Health check failed - application may still be starting up"
fi