#!/bin/sh

. "ui_tests_playwright/.husky/_/husky.sh"
cd ui_tests_playwright
npm run format
npm run lint