import Realm from 'realm'
import CategorySchema from '../schemas/CategorySchema'
import ImagesSchema from '../schemas/ImagesSchema'

export default function getRealm() {
  return Realm.open({
    schema: [CategorySchema, ImagesSchema],
  })
}
  