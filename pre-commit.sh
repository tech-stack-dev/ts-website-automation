#!/bin/sh
echo 'pre-commit starts...'
npm run format && npm run lint
