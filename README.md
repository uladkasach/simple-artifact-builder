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
* [Commands](#commands)
* [Philosophy](#philosophy)
* [Declarations](#declarations)
* [Contribution](#contribution)
<!-- tocstop -->

# Purpose

Deployment artifacts can easily get out of hand in size when unnecessary dependencies are included in it. `simple-artifact-builder` makes it easy to create deployment artifacts with only the dependencies required for your code and nothing more, through file tracing.

# Usage

### 1. install

```sh
npm install --save-dev simple-artifact-builder
```

### 2. configure

define your `artifact.yml` config file to specify:
- which files you would like to `trace`, to include them and their dependencies in your artifact
  - here you can specify just the code that will actually be called and let file tracing figure out the other dependencies that will need to be included
    - e.g., for an `aws-lambda` handler
  - here you can also specify existing `.nft.json` trace files from other build processes, in which case we will simply use that trace output and include those dependencies
    - e.g., for `next.js` support: https://nextjs.org/blog/next-12#output-file-tracing
- which files you would like to `pick`, to include them explicitly in your artifact
  - here you can specify any files that would not be picked up by file tracing
    - e.g., if your code has dynamic imports, file tracing will not be able to determine the dependency on its own

for example, for an aws lambda service, you may use something like this:
```yml
# artifact.yml
trace:
- dist/contract/handlers/**/*.js # include the handlers of an aws-lambda
- !dist/contract/handlers/**/*.test.js # but make sure to not to include any test files

pick:
- config/*.json # also include the `config` directory, since we dynamically import it
```

### 3. use

now that you've configured your project's artifact settings, you can build the artifact.

for example, build the artifact into a zip file (e.g., for usage with [`serverless artifact input`](https://www.serverless.com/framework/docs/providers/aws/guide/packaging#artifact))
```sh
npx simple-artifact-builder zip
```

# Contribution

Team work makes the dream work! Please create a ticket for any features you think are missing and, if willing and able, draft a PR for the feature :)
