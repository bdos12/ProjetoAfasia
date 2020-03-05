import {Alert} from 'react-native'
import getRealm from '../../services/realm'

export default async function deleteItem(item) {

  const realm = await getRealm()

  try{
    realm.write(() => {
      realm.delete(item)
    });
    
    Alert.alert('Apagar', 'Apagado com sucesso')
  }catch (err){
    alert(err)
  }

}
