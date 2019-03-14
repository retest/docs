#!/bin/bash

set -o nounset
set -o errexit
set -o pipefail

git remote set-url origin https://${GH_TOKEN}@github.com/retest/docs.git
git checkout master
mkdocs gh-deploy
