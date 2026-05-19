export function matchFilename(filename) {
  const filenamePattern =
    /^[a-zA-Z0-9\s-]+_\d{2}-\d{2}_\d{2,3}x\d{2,3}_([a-zA-Z]+)_(\d{1,3}x?|[aA][bB])$/;
  return filenamePattern.test(filename);
}

export function removeExtension(filename) {
  const extensionPattern = /\.[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

  return filename.replace(extensionPattern, '');
}
