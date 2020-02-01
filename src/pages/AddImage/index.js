import React, { Component, useEffect, useState } from 'react'
import { Text, View, TextInput, Button, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import getRealm from '../../services/realm'


module.exports = class AddCategoryPage extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      idCategory: this.props.navigation.getParam('idCategory', 'null'),
      name: '', 
      uri: ' ',
      data: []
    }
  }
  
  async saveRealm(category){
    try{
      const realm = await getRealm()
      const id = category.idCategory;
      var idImage = realm.objects('Images').length
      while (!idImage){
        id = id + 1
      }

      const newData = {
          id: idImage,
          name: category.name,
          uri: category.uri,
          idCategory: category.idCategory,
          isCategory: false
        }

      realm.write(() => {
        realm.objects('Category')[id].images.push(newData)
      });
  
    }catch (err){
      alert(err)
    }
  }

  async handleAddImage (category){
    const realm = await getRealm()
    this.setState({data: realm.objects('Category')})
    try{
      this.saveRealm(category)
      this.setState({name: ' '})
      this.setState({uri: ' '})
    }catch (err){
      alert(err)
    }
  }

  chooseFile = () => {
    var options = {
      title: 'Selecionar Imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          uri: source.uri,
        });
      }
    });
  };


  render() {
    return (
      <>
     <View style={{alignItems: 'center'}}>
    <Text>Página para adicionar imagens idCategory: {this.state.idCategory}</Text> 
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text>Nome: </Text>
        <TextInput 
        style={{backgroundColor: '#ccc', flex: 1}}
        value={this.state.name} 
        onChangeText={text => this.setState({name: text})}
        />
        <Text> </Text>
      </View>
      <View style={{alignItems:'center', marginTop: 10}}>
        <Button title="Selecionar Imagem" onPress={() => this.chooseFile()}/>
        <Text> </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image style ={{width: 250, height: 250}} source={{uri: this.state.uri}}/>
        <Text>{this.state.name}</Text>
      </View>
      <View style={{marginTop: 70}}>
        <Button title="Adicionar Categoria" onPress={() => this.handleAddImage(this.state)}/>
      </View>
    </>
    )
  }
}
