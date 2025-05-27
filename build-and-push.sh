#!/bin/bash

# Exit on error
set -e

# Set your Docker Hub username
DOCKER_USERNAME="aswinhariram"

# Login to Docker Hub
echo "Logging in to Docker Hub..."
docker login -u $DOCKER_USERNAME

# Build and push frontend
echo "Building and pushing frontend..."
docker buildx create --use
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t $DOCKER_USERNAME/ocrgenie-frontend:latest \
  --push \
  ./Frontend

# Build and push backend
echo "Building and pushing backend..."
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t $DOCKER_USERNAME/ocrgenie-backend:latest \
  --push \
  ./Backend

echo "Build and push completed successfully!"
