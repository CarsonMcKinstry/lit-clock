build: build-js next-export build-docker save-docker

build-js:
	yarn build
next-export:
	yarn export
build-docker:
	docker build --platform=linux/arm/v7 -t lit-clock .
save-docker:
	docker save -o lit-clock.tar lit-clock