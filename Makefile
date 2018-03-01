all: pack

.PHONY: test cleanPack

build:
	stack build

test:
	stack --stack-yaml stack-ghc.yaml test

haddock:
	stack haddock

binDir = $(shell stack path --local-install-root)
pack: haddock
	bash scripts/pack

cleanPack:
	rm -rf build/*.js build/dist build/deps