FROM python:3.6.8
ADD . /simpleFlaskApp
WORKDIR /simpleFlaskApp
RUN pip install -r requirements.txt

# installing docker
RUN apt-get update
RUN apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
