import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import RenderItem from './components/RenderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles/styles';


export interface Task{
  title:string;
  done:boolean;
  date:Date;
}

export default function App(){
  const [text,setText] = useState('');
  const [tasks,setTasks]= useState<Task[]>([]);

  //Guardar información en el asyncStorage
  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem('mytodo-tasks', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  //Leer los datos en asyncStorage en mi dispositivo
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('mytodo-tasks');
      if (value !== null) {
        const tasksLocal = JSON.parse(value);
        setTasks(tasksLocal);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, [])
  
  const verificarTarea = (texto: string, tmp: Array<Task>) => {
    return tmp.some(i => i.title === texto);
  };
  
  const addTasks =() =>{
    
    const tmp = [...tasks];
    var isTarea = verificarTarea(text,tmp);

    if(isTarea!=false){
      Alert.alert('Alerta', '¡Esta tarea ya existe en la agenda!', [
        {text: 'OK', onPress: () => console.log('Cancel Pressed')},
      ]);
    }else if(isTarea==false){
      const newTasks ={
        title:text,
        done:false,
        date:new Date(),
      }
      tmp.push(newTasks);
      setTasks(tmp);
      storeData(tmp);
      setText('');
    }
  }

  const markDone = (task:Task) =>{
    const tmp = [...tasks];
    const index = tmp.findIndex(i => i.title === task.title);
    const todo = tmp[index];
    todo.done = !todo.done;
    setTasks(tmp);
    storeData(tmp);
  }

  const deleteFunction = (task:Task) =>{

      Alert.alert('Alerta', '¿Estas seguro que quieres eliminar esta tarea?', [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          const tmp = [...tasks];
          const index = tmp.findIndex(i => i.title === task.title);
          tmp.splice(index,1);
          setTasks(tmp);
          storeData(tmp);
          console.log("Eliminado item con exito!!");
        }},
      ]);
    
    
    
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>MI AGENDA</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Agregar nueva tarea' 
            onChangeText={(t:string) => setText(t)}
            value={text}
            style={styles.textInput} 
          />
          <TouchableOpacity style={styles.addButton} onPress={addTasks}>
            <Text style={styles.whiteText}>Agregar</Text>
          </TouchableOpacity>
        </View>
        {/* FlatList ya maneja el scroll, no necesita ser envuelto en un View */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.title} // Usar title como key
          renderItem={({ item }) => (
            <RenderItem item={item} deleteFunction={deleteFunction} markDone={markDone} />
          )}
          contentContainerStyle={{ paddingBottom: 100 }} // Añadir espacio al final
        />
    </View>
  );
}

