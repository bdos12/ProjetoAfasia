import React, { Component } from 'react'
import {SafeAreaView ,StyleSheet ,Alert, BackHandler, TouchableOpacity, Image, Text, View, Button, FlatList } from 'react-native'
import getRealm from '../../services/realm'
import deleteItem from './deleteItem'

module.exports = class HomePage extends Component {

  static navigationOptions = { //Propriedades da navegação
    title: 'Inicio'
  }

  constructor(props){
    super(props);
    this.state = {
      text: '',
      nameCategory: '',
      idCategory: 0,
      isCategory: true,
      data: [],
      imagesTTS: [],
    }
    this.loadRealm()
  }

  componentDidMount() {
    this.BackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  handleBackPress = () => {
    this.loadRealm()
    this.setState({isCategory: true})
    return true;
  };

  async loadRealm (){ //Carregar itens do banco de dados
    const realm = await getRealm()
    const data = realm.objects('Category').sorted('id', true);

    const add = {
      id: Math.random() + 100,
      name: 'Adicionar', 
      uri: require('../../icons/add-circle-512.png'),
      isAdd: true,
    }
   
    const itens = []
    itens.push(add)
    itens.push(... data)

    this.setState({data:itens})
    return data;

  }
  
  setDate = (item) => { //Alterar o estado e renderizar as imagens
    let temp = this.state.data[this.state.data.findIndex((obj) => obj.id === item.id)].images 

    let data = []
    const add = {
      id: Math.random() + 100,
      name: 'Adicionar', 
      uri: require('../../icons/add-circle-512.png'),
      isAdd: true,
    }

    data.push(add)
    data.push(... temp)


    this.setState({idCategory: item.id})
    this.setState({nameCategory: item.name})
    this.setState({data: data})
    this.setState({isCategory: false})
  }
  
  handleDeleteItem = (item) => { //Deletar item do Banco de dados
    deleteItem(item)
    this.loadRealm()
  }
  
  handleAddItem = () => { //Navegação de telas entre addCategory e addImage
    {
      this.state.isCategory ?
      this.props.navigation.navigate('AddCategory'):
      this.props.navigation.navigate('AddImage', 
      {
        idCategory: this.state.idCategory,
        nameCategory: this.state.nameCategory
      })
    }
  }

  renderItem = ({item}) => { //Rendeizar os itens da FlatList
    if(item.isAdd){
      return(
        <>
        <TouchableOpacity style = {{margin: 25, alignItems: 'center'}}
        onPress = {() => this.handleAddItem()}
        >
          <Image style={{width: 130, height: 130}} source={require('../../icons/add-circle-512.png')}/>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        </>
      )
    }else if(item.isCategory){
      return(
        <>
        <TouchableOpacity onPress={() => {
          this.setDate(item)
        }}
        onLongPress = {() => Alert.alert(
          'Teste ', 
          'Apagar categoria ' + item.name + '?', 
          [
            {text: 'Sim', onPress: () => this.handleDeleteItem(item)},
            {text: 'Não'}
          ]
        )} 
        delayLongPress ={300} 
        style={{margin: 25, width: 130, height: 130}}
        
        >
          <Image 
          style ={{height: 130, width: 130}} 
          source={{uri: item.uri}}
          />
          <Text style={{textAlign: 'center'}}>{item.name}</Text>

        </TouchableOpacity>
        </>
      );
    }else{
      return(
      <>
      <TouchableOpacity
      onLongPress = {() => Alert.alert(
        'Teste ', 
        'Apagar o item ' + item.name + '?', 
      [
        {text: 'Sim', onPress: () => this.handleDeleteItem(item)},
        {text: 'Não'}
      ]
      )} 
      delayLongPress = {300}
      
      onPress = {() => this.addTTS(item)}
      style={{margin: 25, width: 130, height: 130}}
      >
        <Image 
        style={{width: 130, height: 130}} 
        source={{uri: item.uri}}
        />
        <Text style={{textAlign: 'center'}}>{item.name}</Text>
      </TouchableOpacity>
      </>
      );
    }
  }
  
  addTTS = (obj) => { //Adicionar item na barra TTs

    const newData = {
      id: Math.random() * 10,
      name: obj.name,
      uri: obj.uri,
      idCategory: obj.idCategory,
      isCategory: false
    }

    let text = this.state.text;
    text = text + ' ' + newData.name
    this.setState({text})
    let tempImage = this.state.imagesTTS;
    tempImage.push(newData)

    this.setState({imagesTTS: tempImage})

  }
  
  renderTTS = obj => { //Renderizar itens da barra TTs
    return(
      <View>
        <Image style = {{height: 60, width: 60, margin: 2}} 
        source = {{uri: obj.item.uri}}
        />
        {/* <Text>{obj.item.name}</Text> */}
      </View>
    );
  }
  
  deleteTTs = () => { //Deletar itens da barra TTs
    let temp = this.state.imagesTTS;
    temp.pop();
    this.setState({imagesTTS: temp})
  }
  
  render() { //Render principal
    return (
      <>
      <View style={{backgroundColor: '#ccc', width:'100%', height: 100, flexDirection: 'row'}}>
        <FlatList 
        data = {this.state.imagesTTS}
        extraData = {this.state}
        horizontal = {true}
        renderItem = {this.renderTTS}
        keyExtractor = {(item) => String(item.id)}
        />
        <Text>{this.state.text}</Text>
        <View style={{height: '100%', width: '20%', backgroundColor: '#ccc', }}>
          <Button title='TTs' onPress={() => {}} />
          <TouchableOpacity onLongPress ={() => alert('Deseja apagar tudo?')} delayLongPress={3000}>
            <Button title='Apagar' onPress={() => this.deleteTTs()}/>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={styles.item}>
        <FlatList 
        data = {this.state.data}
        keyExtractor = {(item) => String(item.id)}
        renderItem = {this.renderItem}
        extraData = {this.state}
        numColumns = {2}
        />
      </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1, 
    flexDirection: 'row', 
    flexBasis: 0,
  },
  ButtonAdd: {
    margin: 25, 
    height: 100, 
    width: 100
  },
  TextAdd:{
    textAlign: 'center'
  },
  Images: {
    height: 100, 
    width: 100
  },
})

