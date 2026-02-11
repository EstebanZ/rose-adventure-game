#!/bin/bash
# Test script to verify Docker build

echo "🌸 Testing Rose Adventure Game Docker Setup 🌸"
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed or not in PATH"
    exit 1
fi

echo "✅ Docker is available"

# Check docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found"
    exit 1
fi

echo "✅ docker-compose.yml exists"

# Validate docker-compose.yml syntax
if command -v docker compose &> /dev/null; then
    if docker compose config > /dev/null 2>&1; then
        echo "✅ docker-compose.yml syntax is valid"
    else
        echo "❌ docker-compose.yml has syntax errors"
        exit 1
    fi
fi

echo ""
echo "🎮 Docker configuration is ready!"
echo ""
echo "To run the game:"
echo "  docker compose up dev    # Development mode on port 8080"
echo "  docker compose up prd    # Production mode on port 80"
echo ""
echo "The game will be available at:"
echo "  http://localhost:8080 (dev)"
echo "  http://localhost:80 (prd)"
