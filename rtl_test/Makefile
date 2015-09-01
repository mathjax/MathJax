# -*- indent-tabs-mode:t; -*-
# Makefile tutorial: http://mrbook.org/blog/tutorials/make/

all: browsersync

browsersync:
	cd ..; \
	nodejs ./rtl_test/node_modules/.bin/browser-sync \
		start \
		--server \
		--startPath "/rtl_test/" \
		--files="unpacked/**/*.js, rtl_test/*, rtl_test/extensions/*"

basicserver:
	xdg-open http://localhost:8080 &
	python -m SimpleHTTPServer 8080

