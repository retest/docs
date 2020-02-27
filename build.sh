#!/usr/bin/env bash
set -o nounset
set -o errexit
set -o pipefail
#set -o xtrace # shell debug option
cd "$(dirname "${BASH_SOURCE[0]}")"

if [ -d "mkdocs" ]; then
  . mkdocs/bin/activate
else
  python3 -m venv mkdocs
  . mkdocs/bin/activate
  pip install mkdocs mkdocs-material mkdocs-redirects
fi

mkdocs build
