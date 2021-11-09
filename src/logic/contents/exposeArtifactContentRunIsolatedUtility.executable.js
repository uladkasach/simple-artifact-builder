/**
 * 🚧 this is a utility to aid in testing your artifacts 🚧
 *
 * enables executing js is a node environment which does _not_ look at parent node_module directories
 * - by default, the node resolution strategy is to check parent `node_module` directories if the package is not found it target `node_module` directory
 *     - this default will cause problems testing artifacts, as your artifact may succeed simply because a required dependency was in the parent directory
 * - this util puts a filter on the files imported by the node resolution strategy, ensuring that they all come from the artifact's content's node_modules directory
 *
 * example usage:
 * ```sh
 * node .artifact/contents.run.isolated.js .artifact/contents/pathOfArtifactContentsFileYouWantToExecute.js
 * ```
 */
const isolateImportsAndExecuteJs = () => {
  // define what file to run
  const pathToRequire = determinePathToRequire();

  // isolate the imports
  isolateImports();

  // now run it
  require(pathToRequire);
};
isolateImportsAndExecuteJs();

/**
 * converts the relative-file-path given as an arg to this script to a relative-file-path that can be "required"
 * - relative file path given as arg is relative to `process.cwd()`
 * - relative file path that can be required is relative to `__dirname`
 */
function determinePathToRequire() {
  const path = require('path');
  const relativeToCwdPathOfTargetFileToExecute = process.argv[2]; // this path is defined relative to the `process.cwd()` of the user
  const absolutePathOfTargetFileToExecute = path.resolve(process.cwd(), relativeToCwdPathOfTargetFileToExecute);
  const relativeToDirnamePathOfTargetFileToExecute = path.relative(__dirname, absolutePathOfTargetFileToExecute);
  return `./${relativeToDirnamePathOfTargetFileToExecute}`;
}

/**
 * updates the node module resolution strategy to exclude importing of paths outside of the artifact contents directory
 * - https://stackoverflow.com/a/32858131/3068233
 */
function isolateImports() {
  const Module = require('module').Module;
  const nodeModulePaths = Module._nodeModulePaths; // grab a reference to the original method
  Module._nodeModulePaths = (from) => {
    const filePaths = nodeModulePaths.call(this, from); // call the original method
    const isolatedFilePaths = filePaths.filter(
      (path) => path.startsWith(`${__dirname}/contents`), // filter down what it resolved to just the ones from the artifacts dir
    );
    return isolatedFilePaths;
  };
}
