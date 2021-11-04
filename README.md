simple-artifact-builder
==============

Easily create deployment artifacts with the minimum set of dependencies required. Tree-shaking made easy.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/simple-artifact-builder.svg)](https://npmjs.org/package/simple-artifact-builder)
[![Codecov](https://codecov.io/gh/uladkasach/simple-artifact-builder/branch/master/graph/badge.svg)](https://codecov.io/gh/uladkasach/simple-artifact-builder)
[![Downloads/week](https://img.shields.io/npm/dw/simple-artifact-builder.svg)](https://npmjs.org/package/simple-artifact-builder)
[![License](https://img.shields.io/npm/l/simple-artifact-builder.svg)](https://github.com/uladkasach/simple-artifact-builder/blob/master/package.json)

# Table of Contents
<!-- toc -->
* [Table of Contents](#table-of-contents)
* [Purpose](#purpose)
* [Usage](#usage)
* [artifact.yml](#artifactyml)
* [artifact.yml](#artifactyml-1)
* [Commands](#commands)
* [Contribution](#contribution)
<!-- tocstop -->

# Purpose

Deployment artifacts can easily get out of hand in size when unnecessary dependencies are included in it. `simple-artifact-builder` makes it easy to create deployment artifacts with only the dependencies required for your code and nothing more, through file tracing.

# Usage

### 1. install

```sh
npm install --save-dev simple-artifact-builder # install it
npx simple-artifact-builder help # and test that you can use it
```

### 2. configure

define your `artifact.yml` config file to specify what files should be included in the artifact with `trace` (to include it and its [traced](https://github.com/vercel/nft) dependencies) or `pick` (to just include that file).

for example, for an aws lambda service, you may use something like this:
```yml
# artifact.yml
trace:
- dist/contract/handlers/**/*.js # include the handlers of an aws-lambda
- !dist/contract/handlers/**/*.test.js # but make sure to not to include any test files

pick:
- config/*.json # also include the `config` directory, since we dynamically import it
```

alternatively, if you're deploying a `Next.JS` project, you may want to use the `.nft.json` trace output files that they already include. for example:
```yml
# artifact.yml
trace:
- dist/server/handler.js # trace the dependencies of the handler to include the handler and all the code it depends on
- .next/**/*.nft.json # use the trace-output files that next.js automatically generates to include all of the dependencies of the .next server

pick:
- .next/**/* # include this whole directory, since the nextjs-server-side-rendering server uses its contents through dynamic imports
- !.next/cache/**.* # exclude the cache though, since that's only needed while compiling and is very large/heavy
```

### 3. use

now that you've configured your project's artifact settings, you can build the artifact.

for example, build the artifact into a zip file (e.g., for usage with [`serverless artifact input`](https://www.serverless.com/framework/docs/providers/aws/guide/packaging#artifact))
```sh
npx simple-artifact-builder zip
```

this will output:
- `.artifact/contents.zip` - the zipped up artifact, ready for deployment
- `.artifact/contents` - a directory which hold the contents that were zipped up
- `.artifact/contents.manifest.json` - a file which lists all of the files included in the contents
- `.artifact/contents.sizes.json` - a file which defines the sizes of each file included in the contents

# Commands
<!-- commands -->
* [`simple-artifact-builder help [COMMAND]`](#simple-artifact-builder-help-command)
* [`simple-artifact-builder zip`](#simple-artifact-builder-zip)

## `simple-artifact-builder help [COMMAND]`

display help for simple-artifact-builder

```
USAGE
  $ simple-artifact-builder help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `simple-artifact-builder zip`

builds and zips the artifact

```
USAGE
  $ simple-artifact-builder zip

OPTIONS
  -c, --config=config  (required) [default: artifact.yml] path to the artifact config yml
  -h, --help           show CLI help
```

_See code: [dist/contract/commands/zip.ts](https://github.com/uladkasach/simple-artifact-builder/blob/v0.0.1/dist/contract/commands/zip.ts)_
<!-- commandsstop -->

# Contribution

Team work makes the dream work! Please create a ticket for any features you think are missing and, if willing and able, draft a PR for the feature :)
