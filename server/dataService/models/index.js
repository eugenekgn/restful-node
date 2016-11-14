'use strict';

const Sequelize = require('sequelize');

const directoryInfo = require('../../shared/directoryInfo');
const databaseConfig = require('config').get('database');

class DatabaseContext {
  constructor({logger}) {
    const sequelize = new Sequelize(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password, {
        dialect: databaseConfig.dialect,
        host: databaseConfig.host,
        port: databaseConfig.port,
        logging: logger.logDb.bind(logger),
        pool: databaseConfig.pool,
        define: {
          freezeTableName: true,
          underscored: true,
          timestamps: true,
          syncOnAssociation: false,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: false,
          schema: databaseConfig.schema
        }
      });

    directoryInfo.get(__dirname)
      .filter((file) => {
        return !file.endsWith('index.js');
      })
      .forEach((file) => {
        const model = sequelize.import(file);

        this[model.name] = model;
      });

    Object.keys(this).forEach((modelName) => {
      if (this[modelName].associate) {
        this[modelName].associate(this);
      }
    });

    this.sequelize = sequelize;
    this.Sequelize = Sequelize;
  }

  isModel(model) {
    return model instanceof this.Sequelize.Model;
  }

  inTransaction(func) {
    return this.sequelize.transaction((transaction) => {
      return func({
        transaction
      });
    });
  }
}

module.exports = DatabaseContext;
