import React, { Component } from 'react'
import { BackHandler, TouchableOpacity, Image, Text, View, Button, FlatList } from 'react-native'
import getRealm from '../../services/realm'

module.exports = class HomePage extends Component {

  static navigationOptions = {
    title: 'Inicio'
  }

  constructor(props){
    super(props);
    this.state = {
      nameCategory: '',
      idCategory: 0,
      isCategory: true,
      data: []
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

  async loadRealm (){
    const realm = await getRealm()
    const data = realm.objects('Category').sorted('id', true);
    this.setState({data:data})
    return data;
  }
  
  setDate = (item) => {
    this.setState({idCategory: item.id})
    this.setState({nameCategory: item.name})
    this.setState({data: this.state.data[this.state.data.findIndex((obj) => obj.id === item.id)].images})
    this.setState({isCategory: false})
  }
  
  renderItem = ({item}) => {
    if(item.isCategory){
      return(
        <>
        <TouchableOpacity onPress={() => {
          this.setDate(item)
        }}>
          <Image style ={{height: 100, width: 100}} 
          source={{uri: item.uri}}
          />
          <Text>{item.name}</Text>
          <Text>id: {item.id}</Text>

        </TouchableOpacity>
        </>
      );
    }else{
      return(
      <>
      <TouchableOpacity>
        <Image 
        style={{height: 100, width: 100}} 
        source={{uri: item.uri}}
        />
        <Text>{item.name}</Text>
        <Text>id: {item.id}</Text>
      </TouchableOpacity>
      </>
      );
    }
  }

  render() {
    return (
      <View>
        {this.state.isCategory ? 
        <Button title="Adicionar categoria" onPress={() => this.props.navigation.navigate('AddCategory')}/> :
        <Button title="Adicionar imagem" onPress={() => this.props.navigation.navigate('AddImage', {idCategory: this.state.idCategory, nameCategory: this.state.nameCategory})}/>
        }
        <FlatList 
        data = {this.state.data}
        keyExtractor = {(item) => String(item.id)}
        renderItem = {this.renderItem}
        extraData = {this.state}
        />
      </View>
    )
  }
}
