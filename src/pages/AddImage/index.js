import React, { Component} from 'react'
import { Text, View, TextInput, Button, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import getRealm from '../../services/realm'

module.exports = class AddCategoryPage extends Component {

  static navigationOptions ={
    title: 'Adicionar Imagem'
  }
  
  constructor(props){
    super(props);
    this.state = {
      nameCategory: this.props.navigation.getParam('nameCategory'),
      idCategory: this.props.navigation.getParam('idCategory', 'null'),
      name: '', 
      uri: ' ',
      data: []
    }
  }
  
  async saveRealm(category){

    if(category.name == '' || category.name == ' '){
      alert("Necessário adicionar um nome para a imagem")
      return
    }else if(category.uri == ' '){
      alert("Necessário Adicionar uma Imagem")
      return
    }

    try{
      const realm = await getRealm()
      const id = category.idCategory;
      let idImage = realm.objects('Images').length

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
      this.setState({name: ' '})
      this.setState({uri: ' '})
      alert("Imagem adicionado com sucesso")
  
    }catch (err){
      alert(err)
    }
  }

  async handleAddImage (category){
    const realm = await getRealm()
    this.setState({data: realm.objects('Category')})

    try{
      this.saveRealm(category)
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
      }else {
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
    <Text>Página para adicionar imagens em {this.state.nameCategory}</Text> 
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
        <Button title="Adicionar" onPress={() => this.handleAddImage(this.state)}/>
      </View>
    </>
    )
  }
}
