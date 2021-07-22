#!/bin/bash

echo What should the verison be?
read VERSION
echo $VERSION

docker build -t evanchipman/abletub:$VERSION .
docker push evanchipman/abletub:$VERSION
ssh root@165.232.140.234 "docker pull evanchipman/abletub:$VERSION && docker tag evanchipman/abletub:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"