# Simple-React-Flask-App

One paragraph description to go



## Getting Started

Let's set up the environment

### Prerequisites

- Docker
- Access server with local forwarding to port 3000 
- (Optional: Add local forwarding to port 5000 to access flask backend directly)
```
$ ssh USERNAME@"SERVER_IP_ADDRESS" -L localhost:3000:localhost:3000
```

### Setting up the environment
- Build docker image
```
$ git clone https://github.com/jsong0327/Simple-React-Flask-App.git
$ cd Simple-React-Flask-App
$ docker-compose build --no-cache
```

### Run docker environment
- start docker image with container
```
$ CURRENT_UID=$(id -u):$(id -g) docker-compose up
```

- access http://localhost:3000

### Useful commands
- access mongoDB with shell
```
$ docker exec -it simpleflaskapp_mongo_1 mongo
```

- access mongoDB with bash
```
$ docker exec -it simpleflaskapp_mongo_1 bash
```

- View containers
```
$ docker container ls -a
```

- Remove containers
```
$ docker container rm "container_name or id"
```

- View images
```
$ docker images
```


- Remove images
```
$ docker rmi "image_name or id"
```


### Permission errors for 'mondoData' folder

- Access root account
```
$ ssh ROOT_USERNAME@"SERVER_IP_ADDRESS"
```
- Locate mongoData folder
```
$ ssh cd /home/USERNAME/SOMEWHERE_IN_YOUR_ACCOUNT
```
- Change folder permission
```
$ sudo chown -R $(id -u USERNAME):$(id -g USERNAME) ./mongoData
```
