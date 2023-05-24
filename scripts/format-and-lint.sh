#!/bin/sh

echo 'this is not working1'
. "ui_tests_playwright/.husky/_/husky.sh"
echo 'this is not working2'
npm run format
npm run lint
echo 'this is not working3'