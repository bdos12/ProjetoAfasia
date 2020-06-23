export default class ImagesSchema {
  static schema = {
    name: 'Images',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      idCategory: 'int',
      name: 'string',
      uri: 'string',
      isCategory: {type: 'bool', default: false},
      description: 'string'
    }
  }
}