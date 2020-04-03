import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  BackHandler,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import getRealm from '../../services/realm';
import deleteItem from './deleteItem';
import speak from '../../services/tts';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';
import RNImgToBase64 from 'react-native-image-base64';


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
    // Navegação de telas entre addCategory e addImage
    this.setState({isVisible: true})
  };

  renderItem = ({item}) => { // Rendeizar os itens da FlatList
    if (item.isAdd) {
      return (
        <>
          <TouchableOpacity
            style={{margin: 25, alignItems: 'center'}}
            onPress={() => this.handleAddItem()}>
            <Image
              style={styles.Images}
              source={require('./icons/icon_add.png')}
            />
            <Text style = {styles.textItens}>{item.name}</Text>

          </TouchableOpacity>
        </>
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
              Alert.alert('Teste ', `Apagar categoria ${item.name}?`, [
                {text: 'Sim', onPress: () => this.handleDeleteItem(item)},
                {text: 'Não'},
              ])
            }
            delayLongPress={300}
            style={styles.Images}>
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
            Alert.alert('Teste ', `Apagar o item ${item.name}?`, [
              {text: 'Sim', onPress: () => this.handleDeleteItem(item)},
              {text: 'Não'},
            ])
          }
          delayLongPress={300}
          onPress={() => this.addTTS(item)}
          style={styles.Images}>
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
      <View style = {styles.imagesTTS}>
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

  handleSaveRealm = () => { //Salvar no banco de dados
    let item = {
      name: this.state.name,
      uri: this.state.uri,
      idCategory: this.state.idCategory
    }
    if (this.state.isCategory){
      this.saveRealm(item, 1)
    }else {
      this.saveRealm(item, 2)
    }
  }

  async saveRealm(category, option){ //Salvar categoria/imagem no banco de dados
    try{
      let data = {}
      if(option === 1){
        const realm = await getRealm()
        let categoryID = Math.floor(Math.random() * 1000);
        const imagesID = Math.floor(Math.random() * 1000);

        data = {
          id: categoryID,
          name: category.name,
          uri: category.uri,
          images: [
            {
              id: imagesID,
              idCategory: categoryID,
              name: category.name,
              uri: category.uri,
              isCategory: false
            },
          ],
          isCategory: true,
        }

        realm.write(() => {
          realm.create('Category', data)
        });

        Alert.alert('Sucesso','Categoria adicionada com sucesso')
      }else {
        const realm = await getRealm()
        const id = this.state.positionCategory;
        let idImage = Math.floor(Math.random() * 1000)

        data = {
            id: idImage,
            name: category.name,
            uri: category.uri,
            idCategory: category.idCategory,
            isCategory: false
          }
          realm.write(() => {
            realm.objects('Category')[id - 1].images.push(data)
          });
          Alert.alert('Sucesso','Imagem adicionado com sucesso')
      }

      
      this.setState({name: ' '})
      this.setState({uri: ' '})
      this.loadRealm()
      this.handleCancelModal()
      
  
    }catch (err){
      Alert.alert('Erro', 'É necessário adicionar uma imagem e um nome')
    }
  }

  
  render() { //Render princial
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
                <Text style={styles.AddCatg}>Adicionar Categoria</Text>
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
            data={this.state.data}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderItem}
            extraData={this.state}
            numColumns={5}
            />
        </SafeAreaView>
      </>
      </>
    );
  }
};

const styles = StyleSheet.create({
  ViewItens: { //filtro de sobre a imagem
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    margin: 25,
  },
  textItens : { //Estilização de texto
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 40,
  },
  imagesTTS: {// Conteiner das imagens colocadas na caixa de texto
    height: 90, 
    width: 110, 
    margin: 8,
    //backgroundColor: '#f5f',
  },
  iconsTTS: { //Conteiner dos icones de play e exclusão
    margin: 2,
    width: 130, 
    height: 95,
    marginTop: -1,
    //backgroundColor: '#2ff',
  },
  item: { // Conteiner abaixo da caixa de texto
    flex: 1,
    flexDirection: 'row',
    flexBasis: 0,
    backgroundColor: '#b8daf5',
  },
  Images: {
    height: 200,
    width: 200,
  },
  TTs: { //conteiner atrás da caixa de texto
    backgroundColor: '#fff',
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    borderColor: '#5fa2d4',
    borderWidth: 5,
    overflow: 'visible',
  },
  TTsView: {//Conteiner de texto do lado direito
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  container: { //Alerta de adicionar imagem  
    height: 555,
    width: 500,
    backgroundColor: '#88C7F6',
    borderColor: '#fff',
    borderWidth: 6,
     borderRadius: 3,
  },
  viewTitle: { //conteirner superior do alert de add imagem
    height: '13%',
    alignItems:'center',
    justifyContent: 'center',
    borderColor: '#5794C2',
    borderWidth: 3,
    borderRadius: 3,
    backgroundColor: '#B8DAF5'
     
     /*#B8DAF5*/
     /*#5794C2 */ 

   
  },
  viewTitleText: { // Titulo do conteiner de add imagem
    fontSize: 40,
    marginTop: '10%', 
    marginBottom: '10%'
  },
  viewMiddle: { //conteiner do meio do alert de add imagem
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '72%',
    borderColor: '#5794C2',
    borderWidth: 3,
    borderRadius: 3,
    backgroundColor: '#B8DAF5'
  },
  viewBottom: { //conteiner inferior do alert de add imagem
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center' ,
    height: '15%',
    borderColor: '#5794C2',
    borderWidth: 3,
    borderRadius: 3,
    backgroundColor: '#B8DAF5'
   
  },
  viewMiddleIcon:{ //conteiner dos icones do alert de add imagens
    alignItems: 'center',
    margin: '15%',

    // backgroundColor: '#fa0'
  },
  middleIconText: {
    fontSize: 30
  },
 
  textadd:{// Texto conteiner inferior do alert de add imagem
    fontSize: 40,
  },
  input: {///Contorno do conteiner de texto de add categoria
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor:'#fff',
    borderBottomWidth: 2,
    // backgroundColor: '#aaa'
  },
  viewBottomIcon: {
    alignContent: 'center',
    alignItems: 'center',
    margin: '2%',
    width: '40%',
    height: '40%',
     //backgroundColor: '#a2fa'
  },
  iconImage: {//Conteiner por de tras dos icones de adicionar imagem
    width: 200,
    height: 200,
    margin: -40,
    marginBottom: 0,
     backgroundColor:'#DCEDFA' 
  },
  image:{// Add imagem--> Conteiner por de tras da imagem adicionada
    width: 200,
    height: 200,
    backgroundColor:'#fff' ,
  },
  viewImage: {// Add imagem--> Conteiner por de tras da imagem adicionada 
    width: 200,
    height: 200,
    
     //backgroundColor: '#5abc'
  },
  viewMiddleInput: { // conteiner do nome da imagem -> Add
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginTop: 10,
   // margin: 25,
    fontSize:30,
     //backgroundColor: '#22fdab'
  },
  viewMiddleItem: { //Add imagem - Conteiner ao redor da  imagem adicionada da galeria
     //backgroundColor: '#fabd',
    width: 250,
    height: 250,
  },
  viewBottomItem: {//Cor do conteiner de cancelar de add imagem 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    height: '100%',
    width: '40%',
     //backgroundColor: '#fabc'
  },
  AddCatg:{ //Fontes de --> Adicionar Categoria/ Cancelar/ Adicionar Obs: Depois de selecionar a imagem
    fontSize: 30,
  },
  AddNome:{
    fontSize: 30,
  }
});
