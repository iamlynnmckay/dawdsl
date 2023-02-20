.PHONY: all install test clean

all: install test

install:
	sudo cp src/luash /usr/local/bin/luash && \
	sudo chmod +x /usr/local/bin/luash

test: install
	cd test/z && \
	echo && \
	luash --list && \
	echo && \
	luash --install && \
	echo && \
	luash --list && \
	echo

clean:
	luash --uninstall-all