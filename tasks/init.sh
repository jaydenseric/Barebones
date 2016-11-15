#!/bin/bash

# Delete example assets
rm -rf components/{counter,generic-content,image-link,section} content/barebones-logo.svg

# Delete example lines
sed -i '' '4d;7,12d' components/app/index.js
sed -i '' '1,3d' components/app/index.css
sed -i '' '19,47d' index.html

# Purge readme
sed -i '' '3,22d;39,47d;59d;76,82d' readme.md

# Delete self
sed -i '' '4d' package.json
rm tasks/init.sh
