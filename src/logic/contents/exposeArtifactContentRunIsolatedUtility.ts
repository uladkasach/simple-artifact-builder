import fs from 'fs';

export const exposeArtifactContentRunIsolatedUtility = async ({
  projectRootDirectory,
}: {
  projectRootDirectory: string;
}) => {
  const toAbsolutePath = (relativePath: string) => `${projectRootDirectory}/${relativePath}`;

  // grab the contents of the utility we want to provision
  const utilityFileContents = await fs.promises.readFile(
    `${__dirname}/exposeArtifactContentRunIsolatedUtility.executable.js`,
  );

  // write those contents into the artifact output dir
  await fs.promises.writeFile(toAbsolutePath('.artifact/contents.run.isolated.js'), utilityFileContents);
};
