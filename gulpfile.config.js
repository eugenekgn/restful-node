'use strict';

class Config {
  constructor() {

    this.ROOT = '.';
    this.ALL = '/**';
    this.ALL_RECURSIVE = '/**/*';
    this.ROOT_ALL_RECURSIVE = this.ROOT + this.ALL_RECURSIVE;

    this.JS = '.js';
    this.JSON = '.json';

    this.ALL_JS = this.ROOT_ALL_RECURSIVE + this.JS;
    this.ALL_JSON = this.ROOT_ALL_RECURSIVE + this.JSON;

    this.dist = 'dist';
    this.distAll = 'dist' + this.ALL;

    this.coverage = 'coverage';
    this.coverageALL = this.coverage + this.ALL;

    this.testFiles = '**/*.test.js';

    this.jsPaths = [
      this.ALL_JS,
      '!' + this.distAll,
      '!server/tests/**',
      '!node_modules/**',
      '!' + this.coverageALL
    ];

    this.appConfig = 'server/config/*.json';
    this.distConfig = 'dist/server/config';

    this.otherFiles = ['./package.json'];

    this.distPath = 'dist';
  }
}

export default new Config();
