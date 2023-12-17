DATA_PATH = ${PWD}
ENV_FILE := .env
all :
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
			- docker system prune -a --volumes
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
