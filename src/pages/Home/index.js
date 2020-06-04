import React, {useState, useEffect} from 'react';
import { 
  View, 
  FlatList, 
  Alert, 
  BackHandler,
  TouchableOpacity,
  Text, 
  Image,
  Modal, 
} from 'react-native';

import { deleteItem, saveRealm, loadRealm } from '../../services/realm'


import styles from './styles'

const HomePage = () => {
  const columns = 4
  const [data, setData] = useState([{}])
  const [imagesTTs, setImagesTTs] = useState([])
  const [isCategory, setIsCategory] = useState(true)
  const [idCategory, setIdCategory] = useState(0)
  const [text, setText] = useState('')

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
    console.log(`[SetItem] - Set data in category ${item.name}`)
    const dataItem = data[data.findIndex(obj => obj.id === item.id)].images;

    const iconAdd = {
      id: Math.random(),
      name: "Adicionar",
      uri: require('./icons/icon_add.png'),
      isAdd: true,
    }

    let newData = []
    newData.push(iconAdd)
    newData.push(...dataItem)

    setData(newData)
    setIsCategory(false)
  }

  async function handlerDeleteItem(item){ //Deletando item do banco de dados
    await deleteItem(item)
    .then(() => loadItemBD())
    .catch(err => console.log(err))
  }


  function addTTs(obj){
    console.log(`[addTTs] - add "${obj.name}" in TTs`)
    const newItemTTs = {
      id: Math.random() * 10,
      name: obj.name,
      uri: obj.uri,
      idCategory: obj.idCategory,
      isCategory: false,
    }
    let newImagesTTS = imagesTTs;
    newImagesTTS.push(newItemTTs) 
    
    let newTextTTs = `${text} ${newItemTTs.name}`
    setImagesTTs(newImagesTTS)
    setText(newTextTTs)
  }

  function renderItem({item}){ //Render > Flatlist >  ViewItens
    if(item.isAdd){ //Implementar add Image
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
          onPress={() => addTTs(item)}
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

  function renderTTS(obj) {
    return(
      <View>
        <TouchableOpacity
        onLongPress={item =>
          Alert.alert('Apagar', 'Deseja apagar?', [
            {text: 'Sim', onPress: () => {}},
            {text: 'Não'},
          ])
        }
        delayLongPress={1500}>
        
        <Image
            style={styles.imagesTTS}
            source={{uri: obj.item.uri}}
            />
          <Text style={styles.textItemTTS}>{obj.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      {/* View Principal */}
      <View style={styles.viewTTS}>
        {/* View TTS */}
        <FlatList
          style={styles.flatListTTS}
          data={imagesTTs}
          horizontal
          renderItem={renderTTS}
          keyExtractor={item => String(item.id)}
        />
        <View styles={styles.viewIconsTTS}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.iconsTTS}
              source={require('./icons/icon_play.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            onLongPress={() =>
              Alert.alert('Apagar', 'Deseja apagar tudo?', [
                {text: 'Sim', onPress: () => {}},
                {text: 'Não'},
              ])
            }
            delayLongPress={1500}>
            <Image
              style={styles.iconsTTS}
              source={require('./icons/icon_excluir.png')}
              />
            </TouchableOpacity>
          </View>
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