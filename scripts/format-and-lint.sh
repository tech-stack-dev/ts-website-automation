#!/bin/sh

. "ui_tests_playwright/.husky/_/husky.sh"
npx run format
npx run lint