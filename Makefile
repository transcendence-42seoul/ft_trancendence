DATA_PATH = ${PWD}/

all :
	mkdir -p $(DATA_PATH)/share/images
	mkdir -p $(DATA_PATH)/share/pofiles
	# docker compose up --build -d
	docker compose up --build

up:
	docker compose up --build
	# docker compose up --build -d

build:
	docker compose --build

down:
	docker compose down

clean:	down

fclean:		clean
			rm -rf $(DATA_PATH)/share/images/*
			rm -rf $(DATA_PATH)/share/pofiles/*
			# docker system prune -a --volumes
			docker rm front
			docker rm back
			docker rm postgres
			docker rmi frontend
			docker rmi backend
			docker rmi postgres
			docker volume rm postgres
			docker volume rm profiles
			docker volume rm react_app
			docker network rm transcendence

re:			fclean all

.PHONY:		all clean fclean re up down build