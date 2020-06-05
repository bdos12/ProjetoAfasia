import { StyleSheet, Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container:{ //Container principal
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: "#e1e1e1",
    flexDirection: 'column',
  },

  //TTS:

  viewTTS: { //Container do TTS
    height: deviceHeight * 0.23,
    backgroundColor: "#c1c1c1",
    flexDirection: 'row',
  },

  flatListTTS:{ //  FlatList > ViewTTS 
    width: deviceWidth - 150,
    height: deviceHeight * 0.23,
    marginLeft: 8,
  },
  imagesTTS: { // Images > FlatListTTS
    width: deviceWidth * 0.12,
    height: deviceHeight * 0.15,
    alignSelf: 'center',
    marginTop: 8,
    marginLeft: 10
  },
  textItemTTS:{ //Text imag > FlatListTTS
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: deviceWidth * 0.015,
    marginLeft: 8,
  },
  viewIconsTTS: {
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  iconsTTS:{ // Icons > viewIconsTTS
    margin: 2,
    width: deviceWidth * 0.1, 
    height: deviceHeight * 0.1,
    resizeMode:'contain',
  },


  //Itens : 
  viewItens:{ //Container dos itens
    width: '100%',
    flex: 1,
  },
  item: { //Item flatList > viewItens
    width: deviceWidth * 0.15,
    height: deviceHeight * 0.4,
    flex: 1/4,
    borderRadius: 10,
    borderColor: '#fff',
},
images: { // Imagens > RenderItem > flatList > viewItens
    top: '10%',
    width: '100%',
    height: '70%',
    resizeMode:'contain',
    borderRadius: 10,
    shadowRadius: 20,
    borderColor:'#DCEDFA',
},
textItem: { //Text Itens > RenderItem > flatList > viewItens
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: deviceWidth * 0.015,
    top: '10%'
},
  flatlistItem:{ //Styles flatlist > viewItens
    width: deviceWidth,
    paddingBottom: 60,
  },


  //Modal geral Config
  Modal: {
    width: deviceWidth * 0.4,
    height: deviceWidth * 0.4,
    backgroundColor: "#e1e1e1",
    alignSelf: 'center',
    marginTop: '10%',
    borderColor: '#d1d1d1',
    borderWidth: 2
  },
  modalTopAndButtonText: {
    textAlign:'center',
    fontSize: deviceWidth * 0.02,
    marginTop: '4%',

  }, 


  //First Modal
  firstModalViewIcons:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '15%',
  }, 
  firstModalIcon: {
    height: deviceHeight * 0.25,
    width: deviceWidth * 0.15,
    resizeMode:"contain",

  },
  firstModalIconText: {
    textAlign: 'center',
    fontSize: deviceWidth * 0.02
  },
  firstModalButton: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#f0f0f0'
  },


  //Second modal
  secondModalImageSelected: {
    alignSelf: 'center',
    marginTop: '3%',
    height: deviceHeight * 0.25,
    width: deviceWidth * 0.15,
    resizeMode:"contain",

  },
  secondModalImageText: {
    textAlign: 'center',
    marginTop: '2%',
    fontSize: deviceWidth * 0.015,
  },
  secondModalInput: {
    alignSelf: 'center',
    height: deviceHeight * 0.08,
    width: deviceWidth * 0.3,
    fontSize: deviceWidth * 0.02,
    borderWidth: 1,
    backgroundColor: '#fff'

  },
  secondModalViewBottom: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '10%',
  },
  secondModalButton: {
    flex: 1,
  },
})  
  
export default styles;