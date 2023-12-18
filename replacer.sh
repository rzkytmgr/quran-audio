#!/bin/bash

if [ $# -ne 2 ]; then
  echo "Usage: $0 <source_directory> <destination_directory>"
  exit 1
fi

source_directory="$1"
destination_directory="$2"

if [ ! -d "$source_directory" ]; then
  echo "Directory '$source_directory' does not exist."
  exit 1
fi

if [ ! -d "$destination_directory" ]; then
  mkdir -p "$destination_directory"
fi

cp -R "$source_directory"/* "$destination_directory"

echo "Replaced from '$source_directory' into '$destination_directory'."