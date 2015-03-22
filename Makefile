CSS=$(wildcard extension/resources/*.css)

lint:
	csslint \
		--ignore=box-sizing,bulletproof-font-face,fallback-colors \
		--errors=duplicate-properties,empty-rules,regex-selectors,vendor-prefix \
		$(CSS)
