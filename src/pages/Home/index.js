import React, { Component } from 'react'
import {BackHandler ,TouchableOpacity, Image ,Text, View, Button, FlatList } from 'react-native'
import getRealm from '../../services/realm'


module.exports = class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
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
    return true;
  };

  async loadRealm (){
    const realm = await getRealm()
    const data = realm.objects('Category').sorted('id', true);
    this.setState({data:data})
    return data;
  }
  
  
  renderItem = ({item}) => {
    if(item.isCategory){
      return(
        <>
        <TouchableOpacity onPress={() => {
          this.setState({data: this.state.data[this.state.data.findIndex((obj) => obj.id === item.id)].images})
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
      <Button title="add Image" onPress={() => this.props.navigation.navigate('AddImage', {idCategory: item.idCategory})}/>
      <TouchableOpacity>
        <Image style={{height: 100, width: 100}} 
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
        <Button title="add Category" onPress={() => this.props.navigation.navigate('AddCategory')}/>
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
