DATA_PATH = ${PWD}/
ENV_FILE := .env
all :
	mkdir -p $(DATA_PATH)/share/images
	mkdir -p $(DATA_PATH)/share/profiles
	# docker compose up --build -d
	docker compose  --env-file $(ENV_FILE) up --build

up:
	docker compose  --env-file $(ENV_FILE) up --build
	# docker compose  --env-file $(ENV_FILE) up --build -d

build:
	docker compose --build

down:
	docker compose down

clean:	down

fclean:		clean
			# rm -rf $(DATA_PATH)/share/images/*
			# rm -rf $(DATA_PATH)/share/profiles/*
			# docker system prune -a --volumes
			- docker rm front
			- docker rm back
			- docker rm postgres
			- docker compose down --volumes --rmi all
			- docker volume rm postgres
			- docker volume rm profiles
			- docker volume rm react_app
			- docker network rm transcendence

re:			fclean all

.PHONY:		all clean fclean re up down build
