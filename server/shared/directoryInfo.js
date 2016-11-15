'use strict';

const fs = require('fs');
const path = require('path');

class DirectoryInfo {

  /**
   * Gets all the files from a directory recursively
   * @param dir
   * @param _files
   * @returns {Array}
   */
  getAllFiles(dir, _files = []) {
    const files = fs.readdirSync(dir);

    for (let index = 0; index < files.length; index++) {
      const fileName = path.resolve(dir, files[index]);

      if (fs.statSync(fileName).isDirectory()) {
        this.getAllFiles(fileName, _files);
      } else {
        _files.push(fileName);
      }
    }
    return _files;
  }
}

module.exports = new DirectoryInfo();
