import React, {useState, useEffect} from 'react';
import { 
  View, 
  FlatList, 
  Alert, 
  BackHandler,
  TouchableOpacity,
  Text, 
  Image,
  TextInput 
} from 'react-native';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ImgToBase64 from 'react-native-image-base64';
import { deleteItem, saveRealm, loadRealm } from '../../services/realm'

import styles from './styles'

var optionsImagePicker = {
    title: 'Selecionar Imagem',
    takePhotoButtonTitle: 'Tirar uma foto',
    chooseFromLibraryButtonTitle: 'Escolher da galeria',
    quality: 1,
    noData: true,
    storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

const HomePage = () => {
  const [data, setData] = useState([{}])
  const [imagesTTs, setImagesTTs] = useState([])
  const [isCategory, setIsCategory] = useState(true)
  const [idCategory, setIdCategory] = useState(0)
  const [positionCategory, setPositionCategory] = useState(0)
  const [text, setText] = useState('')
  const [firstModal, setFirstModal] = useState(false)
  const [secondModal, setSecondModal] = useState(false)
  const [uriItemSelected, setUriItemSelected] = useState(' ')
  const [nameItemSelected, setNameItemSelected] = useState('')
  const [cameraOrGallery, setCameraOrGallery] = useState('')


  useEffect(() => {
    console.log("[useEffect] - call function loadItemBD")
    loadItemBD()
  }, [])
  
  async function loadItemBD(){ // Carregar itens do banco de dados
    console.log("[loadItemBD] - Init")
    console.log("[loadItemBD] - call function loadRealm")

    await loadRealm()
    .then(item => {
      setData(item)
      setIsCategory(true)
      console.log("[loadItemBD] - Loading items Done")
    })
    .catch(err => {
      console.log("[Error loadItemBD] - " + err)
      alert(err)
    })
  }

  async function handleSaveRealm() {
    console.log(`[handleSaveRealm] - Saving ${nameItemSelected} in BD`)
    let item = {
      name: nameItemSelected,
      uri: uriItemSelected,
      idCategory: idCategory
    }
    if (item.name === ' ' || item.uri === ' '){
      return Alert.alert("Erro ao adicionar!", "Precisa adicionar uma imagem e um nome.")
    }
    if(isCategory){
      await saveRealm(item, 1, positionCategory)
      .then(() => {
        setNameItemSelected('')
        setUriItemSelected(' ')
        loadItemBD()
        setFirstModal(false)
        setSecondModal(false)
      })
      .catch(err => alert(err))
    }else{
      await saveRealm(item, 2, positionCategory)
      .then(() => {
        setNameItemSelected('')
        setUriItemSelected(' ')
        loadItemBD()
        setFirstModal(false)
        setSecondModal(false)
      })
      .catch(err => alert(err))
    }
  }

  BackHandler.addEventListener( //Quando o botão de voltar do celular é pressionado
    'hardwareBackPress', () => {
      console.log("[hardwareBackPress] - Pressed")
      if(isCategory){ //Se estiver nas categorias perguntar se o usuário quer fechar o aplicativo
        Alert.alert("Sair", "Deseja sair do aplicativo?", [
          {text: "Sim", onPress:() => {
            console.log("[hardwareBackPress] - Exiting app...")
            BackHandler.exitApp()
          }},
          {text: "Não", onPress: () => {
            console.log("[hardwareBackPress] - Exit Cancel")
          }}
        ])
      }else{ //Se não apenas recarrega o banco de dados
        console.log("[hardwareBackPress] - Loading itens")
        loadItemBD()
      }
      return true
    }
  )

  function setItem(item){ //Abrir as imagens da categoria
    console.log(`[SetItem] - Set data in category ${item.name}`)
    const dataItem = data[data.findIndex(obj => obj.id === item.id)].images;

    const iconAdd = {
      id: Math.random(),
      name: "Adicionar",
      uri: require('./icons/icon_add.png'),
      isAdd: true,
    }

    let newData = []
    newData.push(iconAdd)
    newData.push(...dataItem)

    setIdCategory(item.id)
    setPositionCategory(data.findIndex(obj => obj.id === item.id))
    setData(newData)
    setIsCategory(false)
  }

  async function handlerDeleteItem(item){ //Deletando item do banco de dados
    await deleteItem(item)
    .then(() => loadItemBD())
    .catch(err => console.log(err))
  }

  function addTTs(obj){ //Add item > FlatList> ViewTTS
    console.log(`[addTTs] - Add "${obj.name}" in TTs`)
    const newItemTTs = {
      id: Math.random() * 10,
      name: obj.name,
      uri: obj.uri,
      idCategory: obj.idCategory,
      isCategory: false,
    }
    let newImagesTTS = imagesTTs;
    newImagesTTS.push(newItemTTs) 
    
    let newTextTTs = `${text} ${newItemTTs.name}`
    setImagesTTs(newImagesTTS)
    setText(newTextTTs)
  }

  function renderItem({item}){ //Render > Flatlist >  ViewItens
    if(item.isAdd){ //Implementar add Image
    return(
        <View style={styles.item}>
          <TouchableOpacity
              onPress={() => {
                setFirstModal(true)
                console.log("[Implementar] - Adicionar item/categoria")
              }}
          >
              <Image style={styles.images} source={require('./icons/icon_add.png')}/>
              <Text style={styles.textItem}>{item.name}</Text>
          </TouchableOpacity>
        </View>
    );
    }
    if(item.isCategory){
    return(
        <View style={styles.item}>
          <TouchableOpacity
              onPress={() => setItem(item)}
              onLongPress={() => 
              Alert.alert('Apagar', `Apagar categoria ${item.name}?`,[
                  {text: 'Sim', onPress: () => handlerDeleteItem(item)},
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
          onPress={() => addTTs(item)}
          onLongPress={() => 
          Alert.alert('Apagar', `Apagar imagem ${item.name}?`,[
              {text: 'Sim', onPress: () => handlerDeleteItem(item)},
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

  function renderTTS(obj) { // Render > Flatlist > ViewTTS
    return(
      <View>
        <TouchableOpacity
        onLongPress={() =>
          Alert.alert('Apagar', 'Deseja apagar?', [
            {text: 'Sim', onPress: () => deleteTTS(obj.item)},
            {text: 'Não'},
          ])
        }
        delayLongPress={1500}>
        
        <Image
            style={styles.imagesTTS}
            source={{uri: obj.item.uri}}
            />
          <Text style={styles.textItemTTS}>{obj.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function deleteTTS(obj){ //Delete item > Flatlist > viewTTS
    let newItensTTs = imagesTTs
    if(obj){
      console.log(`[deleteTTS] - Deleting item ${obj.name} on TTS`)
      newItensTTs = imagesTTs.filter(item => item.id !== obj.id)
    }else{
      newItensTTs.pop()
    }
    setImagesTTs([...newItensTTs])
    
  }

  function selectMediaCamera(){
    ImagePicker.launchCamera(optionsImagePicker, response => {
      if (response.error) {
          alert('ImagePicker Error: ', response.error);
      }else {
        if(response.path){
        ImageResizer.createResizedImage(response.path, 800, 600, 'JPEG', 100)
        .then(({uri}) => {
            ImgToBase64.getBase64String(uri)
            .then(base64String => {
                let uri = 'data:image/jpeg;base64,' + base64String
                setUriItemSelected(uri)
            }).catch(err => {alert(err)})
        }).catch(err => alert(err))
        }
      }
    });
  }

  function selectMediaGallery(){
    ImagePicker.launchImageLibrary(optionsImagePicker, response => {
      if (response.error) {
          alert('ImagePicker Error: ', response.error);
      }else {
        if(response.path){
        ImageResizer.createResizedImage(response.path, 800, 600, 'JPEG', 100)
        .then(({uri}) => {
            ImgToBase64.getBase64String(uri)
            .then(base64String => {
                let uri = 'data:image/jpeg;base64,' + base64String
                setUriItemSelected(uri)
            }).catch(err => {alert(err)})
        }).catch(err => alert(err))
        }
      }
    });
  }


  return (
    <View style={styles.container}> 
      {/* View Principal */}
      {/* FirstModal */}
      <Modal 
        isVisible={firstModal}
        onBackButtonPress={() => {
          setFirstModal(false)
        }}
      >
        <View style={styles.Modal}>
          <Text style={styles.modalTopAndButtonText}>Adicionar</Text>

          <View style={styles.firstModalViewIcons}>
            <TouchableOpacity onPress={() =>{
              setCameraOrGallery("Câmera")
              selectMediaCamera()
              setSecondModal(true)
              
              }}>
              <Image style={styles.firstModalIcon} source={require('./icons/icon_camera.png')}/>
              <Text style={styles.firstModalIconText}>Câmera</Text>          
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{
              setCameraOrGallery("Galeria")
              selectMediaGallery()
              setSecondModal(true)
              }}>
              <Image style={styles.firstModalIcon} source={require('./icons/icon_gallery.png')}/>
              <Text style={styles.firstModalIconText}>Galeria</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.firstModalButton} 
            onPress={() => setFirstModal(false)}
          >
            <Text style={styles.modalTopAndButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* SecondModal */}
      <Modal
        isVisible={secondModal}
        onBackButtonPress={() => {
          setSecondModal(false)
          setNameItemSelected('')
          setUriItemSelected(' ')
        }}
      >
        <View style={styles.Modal}>
        <Text style={styles.modalTopAndButtonText}>Adicionar da {cameraOrGallery}</Text>

          {uriItemSelected === ' ' 
          ? 
            <TouchableOpacity onPress={() => {
              if(cameraOrGallery === 'Câmera'){
                selectMediaCamera()
              }else if (cameraOrGallery === 'Galeria'){
                selectMediaGallery()
              }
            }}>
              <Image style={styles.secondModalImageSelected} source={require('./icons/icon_add.png')}/>
            </TouchableOpacity>
          :
            <Image style={styles.secondModalImageSelected} source={{uri: uriItemSelected}}/>

          }



          <Text style={styles.secondModalImageText}>Nome:</Text>
          <TextInput 
            style={styles.secondModalInput}
            value={nameItemSelected}
            onChangeText={name => setNameItemSelected(name)}
          />

        <View style={styles.secondModalViewBottom}>

          <TouchableOpacity style={styles.secondModalButton} onPress={() => {
            setFirstModal(false)
            setSecondModal(false)
            setNameItemSelected('')
            setUriItemSelected(' ')
            }}>
            <Text style={styles.modalTopAndButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondModalButton}
            onPress={() => handleSaveRealm()}
          >
            <Text style={styles.modalTopAndButtonText}>Adicionar</Text>
          </TouchableOpacity>

        </View>

        </View>
      </Modal>

      <View style={styles.viewTTS}>
        {/* View TTS */}
        <FlatList
          style={styles.flatListTTS}
          data={imagesTTs}
          horizontal
          renderItem={renderTTS}
          keyExtractor={item => String(item.id)}
        />
        <View styles={styles.viewIconsTTS}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.iconsTTS}
              source={require('./icons/icon_play.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteTTS()}
            onLongPress={() =>
              Alert.alert('Apagar', 'Deseja apagar tudo?', [
                {text: 'Sim', onPress: () => {
                  console.log(`Deleting All items in TTs`)
                  setImagesTTs([])
                }},
                {text: 'Não'},
              ])
            }
            delayLongPress={1500}>
            <Image
              style={styles.iconsTTS}
              source={require('./icons/icon_excluir.png')}
              />
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.viewItens}>
        {/* Views corpo */}
        <FlatList 
          contentContainerStyle={styles.flatlistItem}
          data ={data}
          renderItem = {renderItem}
          numColumns={4}
          keyExtractor = {(item) => String(item.id)}
        />
      </View>
    </View>
  );
}

export default HomePage;