import { StyleSheet,Dimensions } from "react-native"


const styles= StyleSheet.create({
    container:{
      width:'100%',
      padding:20,
    },
    inputContainer:{
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    title:{
      fontSize:30,
      color:'#6f6f6f',
      textAlign: 'center',      // Centra el texto horizontalmente
      alignSelf: 'center', 
    },
    text:{
      fontSize:16,
      color:'#6f6f6f'
    },
    textDone:{
      fontSize:16,
      color:'#6f6f6f',
      textDecorationLine:'line-through',
    },
    whiteText:{
      fontSize:16,
      color:'#FFF'
    },
    textInput:{
      borderColor:"#6f6f6f",
      borderWidth:1,
      width:Dimensions.get('screen').width * 0.6,
      borderRadius:10,
      paddingLeft:10,
    },
    addButton:{
      backgroundColor:'#5897fb',
      justifyContent:'center',
      alignItems:'center',
      width:Dimensions.get('screen').width * 0.25,
      borderRadius:10,
    },
    //Estilos scroll
    scrollContainer:{
      marginTop:20,
    },
    itemContainer:{
      paddingVertical:20,
      borderBottomColor:'#e4e4e4',
      borderBottomWidth:1,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    removeButton:{
      backgroundColor:'#F33D3D',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      paddingHorizontal:15,
    }
  
})

export default styles;