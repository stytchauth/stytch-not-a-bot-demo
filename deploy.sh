#!/bin/bash

# Path to the .env.local file
ENV_FILE=".env.prod.local"

# Base FLY run command
FLY_CMD="fly deploy -y"

# Check if the .env.local file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE does not exist."
    exit 1
fi

# Read each line from the .env.local file and append to the FLY command
while IFS= read -r line; do
    # Skip empty lines and lines starting with a hash (#)
    if [[ -z "$line" || "$line" =~ ^\s*# ]]; then
        continue
    fi

    # Extract the variable name and value
    IFS='=' read -r name value <<< "$line"

    # Append the environment variable to the FLY command
    FLY_CMD+=" --build-secret $name=\$(dotenv -e .env.local -p $name)"
done < "$ENV_FILE"


# Print the final FLY command
echo "$FLY_CMD"