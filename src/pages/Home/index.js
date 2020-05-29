import React, {Component} from 'react';
import {
  SafeAreaView,
  Alert,
  BackHandler,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList, 
} from 'react-native';
import getRealm, { deleteItem, saveRealm }from '../../services/realm';
import speak from '../../services/tts';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';

import styles from './styles'

// let deviceWidth = Dimensions.get('window').width


module.exports = class HomePage extends Component {
  static navigationOptions = {
    // Propriedades da navegação
    title: 'INICIO',
    titleStyle:{
      fontSize: 40,
    },
    headerStyle: {
      backgroundColor: '#b8daf5',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      nome: ' ',
      uri: ' ',
      text: '',
      nameCategory: ' ',
      idCategory: 0,
      positionCategory: 0,
      isCategory: true,
      data: [],
      imagesTTS: [],
      isVisible: false,
      select: true,
    };
    this.loadRealm();
  }

  componentDidMount() {
    this.BackHandler = BackHandler.addEventListener(
      'hardwareBackPress', () => 
      {
        this.loadRealm()
        this.setState({isCategory: true})
        return true
      },
    );
  }

  async loadRealm() {
    // Carregar itens do banco de dados
    const realm = await getRealm();

    const add = {
      id: Math.random() + 100,
      name: 'Adicionar',
      uri: require('./icons/add-circle-512.png'),
      isAdd: true,
    };

    let itens = []
    itens.push(add)
    itens.push(...realm.objects('Category'))


    this.setState({data: itens})

  }

  setDate = item => {
    // Alterar o estado e renderizar as imagens
    const temp = this.state.data[
      this.state.data.findIndex(obj => obj.id === item.id)
    ].images;

    const data = [];
    const add = {
      id: Math.random() + 100,
      name: 'Adicionar ',
      uri: require('./icons/add-circle-512.png'),
      isAdd: true,
    };

    data.push(add);
    data.push(... temp);

    this.setState({idCategory: item.id});
    this.setState({positionCategory: this.state.data.findIndex(obj => obj.id === item.id)});

    this.setState({nameCategory: item.name});
    this.setState({data});
    this.setState({isCategory: false});
  };

  async handleDeleteItem (item) {
    // Deletar item do Banco de dados
    await deleteItem(item);
    this.loadRealm();
  };

  handleAddItem = () => {
    this.setState({isVisible: true})
  };

  renderItem = ({item}) => { // Rendeizar os itens da FlatList
    if (item.isAdd) {
      return (
        <View style={styles.ViewItens}>
          <TouchableOpacity
            onPress={() => this.handleAddItem()}>
            <Image
              style={styles.Images}
              source={require('./icons/icon_add.png')}
              />
            <Text style={styles.textItens}>{item.name}</Text>

          </TouchableOpacity>
        </View>
      );
    }
    if (item.isCategory) {
      return (
        <View style={styles.ViewItens}>
          <TouchableOpacity
            onPress={() => {
              this.setDate(item);
            }}
            onLongPress={() =>
              Alert.alert('Apagar ', `Apagar categoria ${item.name}?`, [
                {text: 'Sim', onPress: () => this.handleDeleteItem(item)},
                {text: 'Não'},
              ])
            }
            delayLongPress={300}>
            <Image style={styles.Images} source={{uri: item.uri}} />
            <Text style={styles.textItens}>{item.name}</Text>

          </TouchableOpacity>

        </View>
      );
    }
    return (
        <View style={styles.ViewItens}>
          <TouchableOpacity
            onLongPress={() =>
              Alert.alert('Apagar ', `Apagar o item ${item.name}?`, [
                {text: 'Sim', onPress: () => this.handleDeleteItem(item)},
                {text: 'Não'},
              ])
            }
            delayLongPress={300}
            onPress={() => this.addTTS(item)}>
            <Image style={styles.Images} source={{uri: item.uri}} />
            <Text style={styles.textItens}>{item.name}</Text>

          </TouchableOpacity>
        </View>
    );
  };

  addTTS = obj => { // Adicionar item na barra TTs
    const newData = {
      id: Math.random() * 10,
      name: obj.name,
      uri: obj.uri,
      idCategory: obj.idCategory,
      isCategory: false,
    };

    let {text} = this.state;
    text = `${text} ${newData.name}`;
    this.setState({text});
    const tempImage = this.state.imagesTTS;
    tempImage.push(newData);

    this.setState({imagesTTS: tempImage});
  };

  renderTTS = obj => { // Renderizar itens da barra TTs
    return (
      <View style={styles.viewTTs}>
        <TouchableOpacity
          onLongPress={item =>
            Alert.alert('Apagar', 'Deseja apagar?', [
              {text: 'Sim', onPress: () => this.deleteTTs(item)},
              {text: 'Não'},
            ])
          }
          delayLongPress={1500}>
          <Image
            style={styles.imagesTTS}
            source={{uri: obj.item.uri}}
            />
          <Text style={styles.textItens}>{obj.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  deleteTTs = obj => { // Deletar itens da barra TTs
    const temp = this.state.imagesTTS;
    if (obj) {
      temp.pop();
    } else {
      temp.pop();
    }
    this.setState({imagesTTS: temp});
  };

  handleSpeak = () => {
    const temp = this.state.imagesTTS;
    let text = '';
    temp.forEach(item => {
      text = `${text} ${item.name}`;
    });
    speak(text);
  };

  chooseFile = (option) => { //Image Picker
    var options = {
      title: 'Selecionar Imagem',
      takePhotoButtonTitle: 'Tirar uma foto',
      chooseFromLibraryButtonTitle: 'Escolher da galeria',
      quality: 1,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    if(option === 1){
      ImagePicker.launchCamera(options, response => {
        if (response.error) {
          alert('ImagePicker Error: ', response.error);
        } else {
          if(response.path){
            ImageResizer.createResizedImage(response.path, 800, 600, 'JPEG', 100)
            .then(({uri}) => {
                ImgToBase64.getBase64String(uri)
                .then(base64String => {
                  this.setState({uri: 'data:image/jpeg;base64,' + base64String})
                }).catch(err => {alert(err)})
            }).catch(err => alert(err))
          }
        }
      });
      this.setState({select: false})
    }else{
      ImagePicker.launchImageLibrary(options, response => {
        if (response.error) {
          alert('ImagePicker Error: ', response.error);
        } else {
          if(response.path){
            ImageResizer.createResizedImage(response.path, 800, 600, 'JPEG', 100)
            .then(({uri}) => {
              ImgToBase64.getBase64String(uri)
              .then(base64String => {
                this.setState({uri: 'data:image/jpeg;base64,' + base64String})

              }).catch(err => alert(err))
            }).catch(err => alert(err))
          }
        }
      });
      this.setState({select: false})
    }
  };

  handleCancelModal = () => { //Cancelar o modal
    this.setState({select: true})
    this.setState({isVisible: false})
    this.setState({uri: ' '})
    this.setState({name: ''})
  }

  async handleSaveRealm() { //Salvar no banco de dados
    let item = {
      name: this.state.name,
      uri: this.state.uri,
      idCategory: this.state.idCategory
    }
    if (item.name === ' ' || item.uri === ' '){
      return Alert.alert("Erro ao adicionar!", "Precisa adicionar uma imagem e um nome.")
    }
    if (this.state.isCategory){
      if(await saveRealm(item, 1, this.state.positionCategory)){
        this.setState({name: ' '})
        this.setState({uri: ' '})
        this.loadRealm()
        this.handleCancelModal()
      }
    }else {
      if(await saveRealm(item, 2, this.state.positionCategory)){
        this.setState({name: ' '})
        this.setState({uri: ' '})
        this.loadRealm()
        this.handleCancelModal()
      }
    }
  }
  
  render() { //Render princial
    const columns = 4;
    return (
      <>
      <Modal isVisible = {this.state.isVisible}
      style={{
        maxHeight: 500,
        maxWidth: 500,
        alignSelf: 'center',}}
        onBackButtonPress = {() => this.handleCancelModal()}
        >
          
        <View style={styles.container}>
        {
          this.state.select ? 
        <View>
          <View style={styles.viewTitle}>
            <Text style={styles.viewTitleText}>Adicionar</Text>
          </View>
          <View style={styles.viewMiddle}>
            <View style={styles.viewMiddleIcon} >
              <TouchableOpacity onPress={() => this.chooseFile(1)}>
                <Image style ={styles.iconImage} source={require('./icons/icon_camera.png')} />
              </TouchableOpacity>
                <Text style={styles.middleIconText} >Câmera</Text>
            </View>
            <View style={styles.viewMiddleIcon}>
              <TouchableOpacity onPress={() => this.chooseFile(2)}>
                <Image style ={styles.iconImage} source={require('./icons/icon_gallery.png')} />
              </TouchableOpacity>
                <Text style={styles.middleIconText}>Galeria</Text>
            </View>
          </View>
          <View style={styles.viewBottom}>
              <TouchableOpacity style = {styles.viewBottomItem} onPress = {() => this.handleCancelModal()}>
                <Text style={styles.textadd}>Cancelar</Text>
              </TouchableOpacity>
          </View>
        </View> 
        : //Se o Select for falso
        <View style={styles.container}>
          <View style={styles.viewTitle}>
                <Text style={styles.AddCatg}>Adicionar</Text>
          </View>
          <View style={styles.viewMiddle}>
            <View style = {styles.viewMiddleItem}>
              <View style={{alignItems:'center'}}>
                <View style={styles.viewImage}>
                  <Image style={styles.image} source = {{uri: this.state.uri}}/>
                </View>
              </View>
              <View style = {styles.viewMiddleInput}>
                <Text style={styles.AddNome}>Nome: </Text>
                <TextInput 
                style={styles.input}
                value={this.state.name} 
                onChangeText={text => this.setState({name: text})}
              />
              </View>
            </View>
          </View>
          <View style={styles.viewBottom}>
              <TouchableOpacity style = {styles.viewBottomItem} onPress = {() => this.handleCancelModal()}>
                <Text style={styles.AddCatg}>Cancelar</Text>
              </TouchableOpacity>
            <TouchableOpacity style = {styles.viewBottomItem} onPress={() => this.handleSaveRealm()}>
                <Text style={styles.AddCatg}>Adicionar</Text>
              </TouchableOpacity>
          </View>
        </View>
        }
      </View>
      </Modal>
      <>
        <View style={styles.TTs}>
          <FlatList
            style={styles.flatListTTS}
            data={this.state.imagesTTS}
            extraData={this.state}
            horizontal
            renderItem={this.renderTTS}
            keyExtractor={item => String(item.id)}
            />
          <View style={styles.TTsView}>
            <TouchableOpacity onPress={() => this.handleSpeak()}>
              <Image
                style={styles.iconsTTS}
                source={require('./icons/play.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.deleteTTs()}
              onLongPress={() =>
                Alert.alert('Apagar', 'Deseja apagar tudo?', [
                  {text: 'Sim', onPress: () => this.setState({imagesTTS: []})},
                  {text: 'Não'},
                ])
              }
              delayLongPress={1500}>
              <Image
                style={styles.iconsTTS}
                source={require('./icons/exclu.png')}
                />
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView style={styles.item}>
          <FlatList
            style={styles.flatlistItem}
          // createRows(this.state.data, columns)
            // data = {this.createRows(this.state.data, columns)}
            data={this.state.data}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderItem}
            extraData={this.state}
            numColumns={columns}
            />
        </SafeAreaView>
      </>
      </>
    );
  }
};