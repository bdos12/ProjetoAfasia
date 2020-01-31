import React, {useEffect, useState, Component} from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import getRealm from '../../services/realm'


export default class HomePage extends Component {

  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <View>
        <Button title ="Add Categoria" onPress={() => this.props.navigation.navigate('AddCategory')} />
        <Home />
      </View>
    )
  }
}

function Home() {

  const [data, setData] = useState([])

  useEffect(() => {
    loadRealm()
  }, [])

  async function loadRealm(){
    const realm = await getRealm()
    const data = realm.objects('Category').sorted('id', true);

    setData(data)
  }

  return (
    <View>
      <FlatList 
      keyboardShouldPersistTaps='handled'
      data = {data}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => (
        <View>
          <TouchableOpacity>
          <Image style={{height: 100, width: 100}} source ={{uri: item.uri}}/>
          <Text>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )}
      // extraData={data}
      />
    </View>
  );
}
