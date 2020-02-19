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
  Button,
  FlatList,
} from 'react-native';
import getRealm from '../../services/realm';
import deleteItem from './deleteItem';
import speak from '../../services/tts';

module.exports = class HomePage extends Component {
  static navigationOptions = {
    // Propriedades da navegação
    title: 'Inicio',
    headerStyle: {
      backgroundColor: '#b8daf5',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      nameCategory: '',
      idCategory: 0,
      isCategory: true,
      data: [],
      imagesTTS: [],
    };
    this.loadRealm();
  }

  componentDidMount() {
    this.BackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  handleBackPress = () => {
    this.loadRealm();
    this.setState({isCategory: true});
    return true;
  };

  async loadRealm() {
    // Carregar itens do banco de dados
    const realm = await getRealm();
    const data = realm.objects('Category').sorted('id', true);

    const add = {
      id: Math.random() + 100,
      name: 'Adicionar',
      uri: require('../../icons/add-circle-512.png'),
      isAdd: true,
    };

    const itens = [];
    itens.push(add);
    itens.push(...data);

    this.setState({data: itens});
    return data;
  }

  setDate = item => {
    // Alterar o estado e renderizar as imagens
    const temp = this.state.data[
      this.state.data.findIndex(obj => obj.id === item.id)
    ].images;

    const data = [];
    const add = {
      id: Math.random() + 100,
      name: 'Adicionar',
      uri: require('../../icons/add-circle-512.png'),
      isAdd: true,
    };

    data.push(add);
    data.push(...temp);

    this.setState({idCategory: item.id});
    this.setState({nameCategory: item.name});
    this.setState({data});
    this.setState({isCategory: false});
  };

  handleDeleteItem = item => {
    // Deletar item do Banco de dados
    deleteItem(item);
    this.loadRealm();
  };

  handleAddItem = () => {
    // Navegação de telas entre addCategory e addImage
    {
      this.state.isCategory
        ? this.props.navigation.navigate('AddCategory')
        : this.props.navigation.navigate('AddImage', {
            idCategory: this.state.idCategory,
            nameCategory: this.state.nameCategory,
          });
    }
  };

  renderItem = ({item}) => {
    // Rendeizar os itens da FlatList
    if (item.isAdd) {
      return (
        <>
          <TouchableOpacity
            style={{margin: 25, alignItems: 'center'}}
            onPress={() => this.handleAddItem()}>
            <Image
              style={styles.Images}
              source={require('../../icons/icon_add.png')}
            />
            <Text>{item.name}</Text>
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
            <Text style={{textAlign: 'center'}}>{item.name}</Text>
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
          <Text style={{textAlign: 'center'}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  addTTS = obj => {
    // Adicionar item na barra TTs

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

  renderTTS = obj => {
    // Renderizar itens da barra TTs
    return (
      <TouchableOpacity
        onLongPress={() =>
          Alert.alert('Apagar', 'Deseja apagar?', [
            {text: 'Sim', onPress: item => this.deleteTTs(item)},
            {text: 'Não'},
          ])
        }
        delayLongPress={1500}>
        <Image
          style={{height: 60, width: 60, margin: 2}}
          source={{uri: obj.item.uri}}
        />
        <Text>{obj.item.name}</Text>
      </TouchableOpacity>
    );
  };

  deleteTTs = obj => {
    // Deletar itens da barra TTs
    const temp = this.state.imagesTTS;
    if (obj) {
      temp.splice(obj);
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

  render() {
    // Render principal
    return (
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
                style={{width: 50, height: 47}}
                source={require('../../icons/icon_speak.png')}
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
                style={{width: 50, height: 47}}
                source={require('../../icons/icon_delete.png')}
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
            numColumns={2}
          />
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  ViewItens: {
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    margin: 25,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: 0,
    backgroundColor: '#b8daf5',
  },
  Images: {
    height: 130,
    width: 130,
  },
  TTs: {
    backgroundColor: '#fff',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    borderColor: '#5fa2d4',
    borderWidth: 5,
    overflow: 'visible',
  },
  TTsView: {
    height: '100%',
    width: '20%',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
});
