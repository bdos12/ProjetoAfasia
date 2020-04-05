import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    ViewItens: { //filtro de sobre a imagem
      width: 200,
      height: 330,
      //backgroundColor: '#fff',
      margin: 25,
    },
    textItens : { //Estilização de texto
      textAlign: 'center',
      alignItems: 'center',
      alignContent: 'center',
      fontSize: 40,
    },
    imagesTTS: {// Conteiner das imagens colocadas na caixa de texto
      height: 100, 
      width: 150, 
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
    TTs: { //conteiner  da caixa de texto
      backgroundColor: '#fff',
      width: '100%',
      height: '33%',
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
  
export default styles;