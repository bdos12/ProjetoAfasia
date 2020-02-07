import getRealm from '../../services/realm'

export default async function deleteItem(item) {

  const realm = await getRealm()

  try{
    realm.write(() => {
      realm.delete(item)
    });
    
    alert('Sucesso')
  }catch (err){
    alert(err)
  }

}
