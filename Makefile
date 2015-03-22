CSS=$(wildcard extension/resources/*.css)

lint:
	csslint --ignore=box-sizing,bulletproof-font-face,fallback-colors $(CSS)
