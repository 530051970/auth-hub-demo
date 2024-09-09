#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <asset_package_name> <asset_stack_name> <version>"
    exit 1
fi

# Get the passed parameters
ASSET_PACKAGE_NAME=$1
ASSET_STACK_NAME=$2
VERSION=$3

# Modify package name
mv "$(pwd)" "$(dirname "$(pwd)")/$ASSET_PACKAGE_NAME"
cd "$(dirname "$(pwd)")/$ASSET_PACKAGE_NAME"

sed -i '' "s/auth-hub-demo-stack/${ASSET_PACKAGE_NAME}/g" bin/main.ts
sed -i '' "s/AuthHubDemoStack/${ASSET_STACK_NAME}/g" bin/main.ts

sed -i '' "s/AuthHubDemoStack/${ASSET_STACK_NAME}/g" lib/auth-hub-demo-stack.ts
mv lib/auth-hub-demo-stack.ts lib/${ASSET_PACKAGE_NAME}.ts



