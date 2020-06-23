import Realm from 'realm'
import {Alert} from 'react-native'

import CategorySchema from '../schemas/CategorySchema'
import ImagesSchema from '../schemas/ImagesSchema'

export default function getRealm() {
  return Realm.open({
    schema: [CategorySchema, ImagesSchema],
  })
}

export async function deleteItem(item){
  console.log("[deleteItem] - Init")

  const realm = await getRealm()
  try{
    realm.write(() => {
      realm.delete(item)
    });
    console.log("[deleteItem] - Item deleted")
    Alert.alert('Apagar', 'Apagado com sucesso')
  }catch (err){
    alert(err)
  }
}

export async function saveRealm(category, option, positionCategory){ //Salvar categoria/imagem no banco de dados
  try{
    let data = {}
    if(option === 1){
      const realm = await getRealm()
      let categoryID = Math.floor(Math.random() * 1000);
      const imagesID = Math.floor(Math.random() * 1000);

      data = {
        id: categoryID,
        name: category.name,
        uri: category.uri,
        images: [
          {
            id: imagesID,
            idCategory: categoryID,
            name: category.name,
            uri: category.uri,
            isCategory: false
          },
        ],
        isCategory: true,
      }

      realm.write(() => {
        realm.create('Category', data)
      });

      Alert.alert('Sucesso','Categoria adicionada com sucesso')
      return true

    }else {
      const realm = await getRealm()
      const id = positionCategory;
      let idImage = Math.floor(Math.random() * 1000)

      data = {
          id: idImage,
          name: category.name,
          uri: category.uri,
          idCategory: category.idCategory,
          isCategory: false
        }
        realm.write(() => {
          realm.objects('Category')[id - 1].images.push(data)
        });
        Alert.alert('Sucesso','Imagem adicionado com sucesso')
        return true
    }
    

  }catch (err){
    Alert.alert('Erro', 'É necessário adicionar uma imagem e um nome')
  }
}

export async function loadRealm(data){
  console.log("[loadRealm] - Init")
  
  const realm = await getRealm();

  const add = {
    id: Math.random(),
    name: "Adicionar",
    uri: require('../pages/Home/icons/icon_add.png'),
    isAdd: true,
  };

  // const add = {}

  let item = []

  item.push(add);
  // item.push(data)
  item.push(...realm.objects('Category'))
  console.log("[loadRealm] - Done")

  return item

}