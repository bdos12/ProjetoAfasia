import React, {useState, useEffect} from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  Alert, 
  Image, 
  Button
} from 'react-native';

import getRealm, { deleteItem, saveRealm, loadRealm } from '../../services/realm'

import styles from './styles'

const HomePage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    loadRealm(data)
    .then(item => setData(item))
    .catch(err => alert(err))
  }, [])

  function renderItem({item}){ //Falta o add Item
    if(item.isCategory){
      return(
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => setItem(item)}
            onLongPress={() => 
              Alert.alert('Apagar', `Apagar categoria ${item.name}?`,[
                {text: 'Sim', onPress: () => {}/* Deletar item*/},
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
            {text: 'Sim', onPress: () => {}/* Deletar item*/},
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

  function setItem(item){

    setData(data[data.findIndex(obj => obj.id === item.id)].images)
  }

  const columns = 4
  return (
    <View style={styles.container}> 
      {/* View Principal */}
      <View style={styles.viewTTS}>
        {/* View TTS */}

      </View>

      <View style={styles.viewItens}>
        {/* Views corpo */}
        <FlatList 
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