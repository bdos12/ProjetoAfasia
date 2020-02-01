export default class CategorySchema {
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      name: 'string',
      uri: 'string',
      images: {type: 'list', objectType: 'Images'} ,
      isCategory: {type: 'bool', default: true}
    }
  }
};
