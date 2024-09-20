#!/usr/bin/env bash
# Exit on error
set -o errexit
echo "Failed to install requirements"; pwd; ls -al; exit 1;
# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Check for issues before proceeding (optional but recommended)
python manage.py check

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate