#!/bin/sh
. "ui_tests_playwright/.husky/_/husky.sh"
echo 'pre-commit starts...'
npx run format
