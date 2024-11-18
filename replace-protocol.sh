#!/bin/bash
find ./src -type f -exec sed -i '' 's/Protocol/Vatly/g' {} +
find . -name "*.md" -type f -exec sed -i '' 's/Protocol/Vatly/g' {} +
