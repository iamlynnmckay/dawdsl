.PHONY: all

all:
	(cd src/luash && make) && \
	(cd src/dawdsl && make) && \
	(cd src/dawdsl-renoise && make)