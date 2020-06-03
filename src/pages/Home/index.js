import React, {useState, useEffect} from 'react';
import { 
  View, 
  FlatList, 
  Alert, 
  BackHandler,
  TouchableOpacity,
  Text, 
  Image,
  DrawerLayoutAndroidComponent, 
} from 'react-native';

import { deleteItem, saveRealm, loadRealm } from '../../services/realm'

import styles from './styles'

const HomePage = () => {
  const columns = 4
  const [data, setData] = useState([{}])
  const [isCategory, setIsCategory] = useState(true)
  const [idCategory, setIdCategory] = useState(0)

  useEffect(() => {
    console.log("[useEffect] - call function loadItemBD")
    loadItemBD()
  }, [])
  
  async function loadItemBD(){ // Carregar itens do banco de dados
    console.log("[loadItemBD] - Init")
    console.log("[loadItemBD] - call function loadRealm")

    await loadRealm()
    .then(item => {
      setData(item)
      setIsCategory(true)
      console.log("[loadItemBD] - Loading items Done")
    })
    .catch(err => {
      console.log("[Error loadItemBD] - " + err)
      alert(err)
    })
  }

  BackHandler.addEventListener( //Quando o botão de voltar do celular é pressionado
    'hardwareBackPress', () => {
      console.log("[hardwareBackPress] - Pressed")
      if(isCategory){ //Se estiver nas categorias perguntar se o usuário quer fechar o aplicativo
        Alert.alert("Sair", "Deseja sair do aplicativo?", [
          {text: "Sim", onPress:() => {
            console.log("[hardwareBackPress] - Exiting app...")
            BackHandler.exitApp()
          }},
          {text: "Não", onPress: () => {
            console.log("[hardwareBackPress] - Exit Cancel")
          }}
        ])
      }else{ //Se não apenas recarrega o banco de dados
        console.log("[hardwareBackPress] - Loading itens")
        loadItemBD()
      }
      return true
    }
  )

  function setItem(item){ //Abrir as imagens da categoria
    const dataItem = data[data.findIndex(obj => obj.id === item.id)].images;

    const iconAdd = {
      id: Math.random(),
      name: "Adicionar",
      uri: require('./icons/icon_add.png'),
      isAdd: true,
    }

    let newData = []
    newData.push(iconAdd)
    newData.push(dataItem)

    setData(newData)
    setIsCategory(false)
  }

  async function handlerDeleteItem(item){
    await deleteItem(item)
    .then(() => loadItemBD())
    .catch(err => console.log(err))
  }

  function renderItem({item}){ //Render > 
    if(item.isAdd){
    return(
        <View style={styles.item}>
          <TouchableOpacity
              onPress={() => console.log("[Implementar] - Adicionar item/categoria")}
          >
              <Image style={styles.images} source={require('./icons/icon_add.png')}/>
              <Text style={styles.textItem}>{item.name}</Text>
          </TouchableOpacity>
        </View>
    );
    }
    if(item.isCategory){
    return(
        <View style={styles.item}>
          <TouchableOpacity
              onPress={() => setItem(item)}
              onLongPress={() => 
              Alert.alert('Apagar', `Apagar categoria ${item.name}?`,[
                  {text: 'Sim', onPress: () => handlerDeleteItem(item)},
                  {text: 'Não'},
              ])  
              }
              delayLongPress={300}>
              <Image style={styles.images} source={{uri: item.uri}}/>
              <Text style={styles.textItem}>{item.name}</Text>
          </TouchableOpacity>
        </View>
    );
    }
    return(
    <View style={styles.item}>
        <TouchableOpacity
          onLongPress={() => 
          Alert.alert('Apagar', `Apagar imagem ${item.name}?`,[
              {text: 'Sim', onPress: () => handlerDeleteItem(item)},
              {text: 'Não'},
          ])  
          }
          delayLongPress={300}>
          <Image style={styles.images} source={{uri: item.uri}}/>
          <Text style={styles.textItem}>{item.name}</Text>

        </TouchableOpacity>
    </View>
    );
}

  return (
    <View style={styles.container}> 
      {/* View Principal */}
      <View style={styles.viewTTS}>
        {/* View TTS */}
      </View>
      <View style={styles.viewItens}>
        {/* Views corpo */}
        <FlatList 
          contentContainerStyle={styles.flatlistItem}
          data ={data}
          renderItem = {renderItem}
          numColumns={columns}
          keyExtractor = {(item) => String(item.id)}
        />
      </View>
    </View>
  );
}

export default HomePage;