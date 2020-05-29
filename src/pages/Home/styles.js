import { StyleSheet, Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


const styles = StyleSheet.create({
    ViewItens: { //filtro de sobre a imagem
      width: deviceWidth * 0.15,
      height: deviceHeight * 0.4,
      flex: 1/4,
      margin: '2%',
      borderRadius: 10,
      // alignItems: 'center',
      //borderWidth: 10,
      borderColor: '#fff',
      //backgroundColor: '#DCEDFA',
    },
    textItens : { //Estilização de texto
      textAlign: 'center',
      alignItems: 'center',
      alignContent: 'center',
      fontSize: deviceWidth * 0.015,
      margin: '5%'
      // resizeMode:'contain',
      // tex
      // fontSize: deviceWidth * 0.02,

    },
    viewTTs:{
      height: deviceHeight * 0.30,
      width: deviceWidth * 0.13,

    },
    imagesTTS: {// Conteiner das imagens colocadas na caixa de texto
      // width: 150,
      width: deviceWidth * 0.12,
      height: deviceHeight * 0.15,
      resizeMode:'contain',
      margin: 8,
      // backgroundColor: '#f5f',
    },
    iconsTTS: { //Conteiner dos icones de play e exclusão
     margin: 2,
     width: deviceWidth * 0.1, 
     height: deviceHeight * 0.14,
     marginTop: -1,
     resizeMode:'contain'
    //  backgroundColor: '#2ff',
    },
    item: { // Conteiner abaixo da caixa de texto
      flex: 1,
      flexDirection: 'column',
      flexBasis: 0,
      backgroundColor: '#b8daf5',
      width: deviceWidth,
    },
    Images: {
      // width: 200,
      top: 10,
      width: '100%',
      height: '70%',
      resizeMode:'contain',
     borderRadius: 10,
     shadowRadius: 20,
    
    borderColor:'#DCEDFA',
    },
    TTs: { //conteiner  da caixa de texto
      backgroundColor: '#fff',
      width: deviceWidth,
      height: deviceHeight * 0.30,
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
      height: deviceHeight * 0.7,
      width: deviceWidth * 0.4,
      backgroundColor: '#88C7F6',
      borderColor: '#fff',
      borderWidth: 6,
      borderRadius: 3,
    },
    viewTitle: { //conteirner superior do alert de add imagem
      height: deviceHeight * 0.1,
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
      fontSize: deviceWidth * 0.02,
      marginTop: '10%', 
      marginBottom: '10%'
    },
    viewMiddle: { //conteiner do meio do alert de add imagem
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: deviceHeight * 0.47,
      borderColor: '#5794C2',
      borderWidth: 3,
      borderRadius: 3,
      backgroundColor: '#B8DAF5'
    },
    viewBottom: { //conteiner inferior do alert de add imagem
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center' ,
      height: deviceHeight * 0.1,
      borderColor: '#5794C2',
      borderWidth: 3,
      borderRadius: 3,
      backgroundColor: '#B8DAF5'
     
    },
    viewMiddleIcon:{ //conteiner dos icones do alert de add imagens
      alignItems: 'center',
      margin: '2%',
      // backgroundColor: '#fa0'
    },
    middleIconText: {
      fontSize: deviceWidth * 0.03,
    },
   
    textadd:{// Texto conteiner inferior do alert de add imagem - interno
      fontSize: deviceWidth * 0.02,
      
    },
    input: {///Contorno do conteiner de texto de add categoria
      width: deviceWidth * 0.15,
      height: deviceHeight * 0.07,
      fontSize: deviceWidth * 0.02,
      marginBottom: -3,
      backgroundColor: '#fff'
    },
    viewBottomIcon: {
      alignContent: 'center',
      alignItems: 'center',
      margin: '2%',
      width: 300,
      height: 300,
       //backgroundColor: '#a2fa'
    },
    iconImage: {//Conteiner por de tras dos icones de adicionar imagem
      height: deviceHeight * 0.25,
      width: deviceWidth * 0.15,
      backgroundColor:'#DCEDFA',
      resizeMode:"contain",


    },
    image:{// Add imagem--> Conteiner por de tras da imagem adicionada
      marginTop: '10%',
      height: deviceHeight * 0.25,
      width: deviceWidth * 0.15,
      backgroundColor:'#fff' ,
      resizeMode:"contain",
    },
    viewImage: {// Add imagem--> Conteiner por de tras da imagem adicionada 
      height: deviceHeight * 0.25,
      width: deviceWidth * 0.15,
       //backgroundColor: '#5abc'
    },
    viewMiddleInput: { // conteiner do nome da imagem -> Add
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: deviceHeight,
      width: deviceWidth * 0.295,
      flex: 1,
      marginTop: '5%',
      //  backgroundColor: '#22fdab'
    },
    viewMiddleItem: { //Add imagem - Conteiner ao redor da  imagem adicionada da galeria
       //backgroundColor: '#fabd',
      alignItems: 'center',
      height: deviceHeight * 0.40,
      width: deviceWidth * 0.35,
      resizeMode:"contain",
    },
    viewBottomItem: {//Cor do conteiner de cancelar de add imagem 
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: deviceWidth * 0.40,
      width: deviceWidth * 0.3,
       //backgroundColor: '#fabc'
    },
    AddCatg:{ //Fontes de --> Adicionar Categoria/ Cancelar/ Adicionar Obs: Depois de selecionar a imagem
      fontSize: deviceWidth * 0.02,
    },
    AddNome:{
      fontSize: deviceWidth * 0.02,
    },
    flatListTTS:{
      width: deviceWidth - 300,
      height: deviceHeight * 0.30,
    },
    modalAdd: {
      maxHeight: deviceHeight * 0.2,
      maxWidth: deviceWidth * 0.2,
      alignSelf: 'center',
    },
    itemEmpty: {
      backgroundColor: "transparent"
    },
    flatlistItem:{
      // height:deviceHeight + 500,
      // width: deviceWidth
    }
  });
  
export default styles;