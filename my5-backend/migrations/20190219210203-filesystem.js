'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('filesystems', {
    id: {type: 'int', unsigned: true, primaryKey: true, autoIncrement: true},
    type: 'string',
    parentID: {type: 'int', unsigned: true},
    name: 'string',
    size: 'string',
    owner: 'string',
    status: 'string',
    timestamp: 'string'
  });
};

exports.down = function(db) {
  return db.dropTable('filesystems');
};

exports._meta = {
  version: 1
};
