#!/usr/bin/zsh

set -e  # Exit immediately if a command exits with a non-zero status

docker build . -t ignite-shop:latest
docker tag ignite-shop:latest registry.digitalocean.com/isainho/ignite-shop:latest
docker push registry.digitalocean.com/isainho/ignite-shop:latest
