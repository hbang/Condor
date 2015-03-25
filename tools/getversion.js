#!/usr/bin/env node
var manifest = require("../extension/manifest.json");
process.stdout.write(manifest.version);
