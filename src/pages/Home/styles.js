import { StyleSheet, Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container:{ //Container principal
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: "#e1e1e1",
    flexDirection: 'column'
  },


  //TTS:

  viewTTS: { //Container do TTS
    height: deviceHeight * 0.23,
    backgroundColor: "#c1c1c1",
    flex:1,
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
    // resizeMode: 'contain',
    marginTop: 8,
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
    // alignItems: 'flex-end',
    // flexDirection: 'column',
  },
  iconsTTS:{ // Icons > viewIconsTTS
    margin: 2,
    width: deviceWidth * 0.1, 
    height: deviceHeight * 0.1,
    marginTop: -1,
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
  
})  
  
export default styles;