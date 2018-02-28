all: pack

.PHONY: test

build:
	stack build

test:
	stack --stack-yaml stack-ghc.yaml test

haddock:
	stack haddock

pack: haddock
	echo "packaging not implemented"
