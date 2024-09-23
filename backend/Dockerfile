# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Install PostgreSQL client libraries and build tools
RUN apt-get update && apt-get install -y libpq-dev gcc

# Set the working directory in the container
WORKDIR /app

# Copy the wait-for-it.sh script and give it executable permissions
COPY wait-for-it.sh /app/
RUN chmod +x /app/wait-for-it.sh  # Ensure the script has execute permissions

# Copy the requirements.txt and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project code into the container
COPY . /app/

# Collect static files for production (run 'collectstatic' inside the container)
RUN python manage.py collectstatic --noinput

# Wait for PostgreSQL to be ready, run system check, apply migrations, and start the Django server
CMD ["./wait-for-it.sh", "db:5432", "--", "/bin/sh", "-c", "python manage.py check && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
