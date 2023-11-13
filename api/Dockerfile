FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR  /app

COPY ../pyproject.toml poetry.lock* /app/
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev
COPY . /app/

CMD ["uvicorn", "--reload", "--host=0.0.0.0", "--port=8000", "api.main:app"]
