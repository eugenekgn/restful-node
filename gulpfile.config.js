'use strict';

class Config {
  constructor() {

    const ALL = '/**';

    this.dist = 'dist';
    this.distAll = 'dist' + ALL;

    this.coverage = 'coverage';
    this.coverageALL = this.coverage + ALL;

    this.jsPaths = [
      './**/*.js',
      '!' + this.distAll,
      '!node_modules/**',
      '!' + this.coverageALL
    ];

    this.configurationPaths = ['./package.json'];
    this.testFiles = '**/*.spec.js';

    this.distPath = 'dist';
  }
}

export default new Config();