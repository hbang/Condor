CSS=$(wildcard extension/resources/*.css)

ifeq ($(shell uname -s),Darwin)
CHROME=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
else
CHROME=google-chrome
endif

VERSION=$(shell ./tools/getversion.js)
ZIPNAME=../release/condor-chrome-$(VERSION).zip

all: release

lint:
	csslint \
		--ignore=box-sizing,bulletproof-font-face,fallback-colors \
		--errors=duplicate-properties,empty-rules,regex-selectors,vendor-prefix \
		$(CSS)

release: clean extension
	mkdir release

	cd extension && zip -qqr $(ZIPNAME) .
	cd tools && zip -qq $(ZIPNAME) key.pem

	$(CHROME) --no-message-box --pack-extension=$(PWD)/extension --pack-extension-key=tools/key.pem
	mv extension.crx release/condor-$(VERSION).crx

clean:
	-rm -r release
