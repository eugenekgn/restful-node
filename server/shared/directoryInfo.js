'use strict';

import fs from 'fs';

class DirectoryInfo {

  /**
   * Gets all the files from a directory recursively
   * @param path
   * @param _files
   * @returns {Array}
   */
  getAllFiles(path, _files = []) {
    const files = fs.readdirSync(path);

    for (let index = 0; index < files.length; index++) {
      const fileName = path.resolve(path, files[index]);

      if (fs.statSync(fileName).isDirectory()) {
        this.getAllFiles(fileName, _files);
      } else {
        _files.push(fileName);
      }
    }

    return _files;
  }
}

export default new DirectoryInfo();
