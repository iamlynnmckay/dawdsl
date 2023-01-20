.PHONY: all

all:
	(cd src/renoise-xnrx && make) && \
	(cd src/luash && make) && \
	(cd src/dawdsllua && make) && \
	(cd src/dawdsl-renoise && make)