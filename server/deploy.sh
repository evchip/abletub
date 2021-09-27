#!/bin/bash

echo What should the version be?
read VERSION
echo $VERSION

docker build -t evanchipman/abletubipfs:$VERSION .
docker push evanchipman/abletubipfs:$VERSION
ssh root@147.182.237.175 "docker pull evanchipman/abletubipfs:$VERSION && docker tag evanchipman/abletubipfs:$VERSION dokku/cashewapi:$VERSION && dokku deploy cashewapi $VERSION"