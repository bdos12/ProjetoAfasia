export default class CategorySchema {
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      name: 'string',
      uri: 'string',
      isCategory: 'bool'
    }
  }
}