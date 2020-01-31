import Realm from 'realm'
import CategorySchema from '../schemas/CategorySchema'

export default function getRealm() {
  return Realm.open({
    schema: [CategorySchema],
  })
}