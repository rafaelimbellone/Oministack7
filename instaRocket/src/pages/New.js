import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';

import { View, 
         StyleSheet,
         TouchableOpacity, 
         Text, 
         TextInput,
         Image, 
         KeyboardAvoidingView,
         Platform
        } from 'react-native';
import api from '../services/api';


export default function New({ navigation }) {

    
    const [author, setAuthor] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashTags] = useState('');
    const [preview, setPrewiew] = useState(null);
    const [image, setImage] = useState(null);

    async function handleSubmit() {     
       
      try{
       const data =  new FormData();
       data.append('image', image);
       data.append('author', author);
       data.append('place', place);
       data.append('description', description);
       data.append('hashtags', hashtags);
       
       const rep = await api.post('/posts',data);
       console.log(rep);
       navigation.navigate('Feed')
    }catch(error){
      alert(error);
    }
  }

   function handleSelectImage(){
        ImagePicker.showImagePicker({
            title: 'Seleciona Imagem',
        }, upload => {
            if(upload.error){
                console.log('Error');
            }else if(upload.didCancel){
                console.log('Used Cancel');
            }else{
                const preview = {
                   uri: `data:image/jpeg;base64,${upload.data}`
               }
               
               let prefix;
               let ext;

               if(upload.fileName){
                [prefix, ext] = upload.fileName.split('.')
                ext = ext.toLowerCase() === 'heic' ? 'jpeg' : ext; 
               }else{
                    prefix = new Date().getTime();
                    ext = 'jpeg'
               }

                const image  = {
                  uri: upload.uri,
                  type: upload.type,
                  name: upload.fileName,
               }


               setPrewiew( preview );
               setImage(image);
            }
        })
    }
        return (
          <KeyboardAvoidingView 
               style={styles.container}
               behavior="position"
               enabled={Platform.OS === 'android'}
          >

            <TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
               <Text style={styles.selectButtonText}> Selecionar Imagem </Text>
            </TouchableOpacity>
            
            { preview && <Image style={styles.preview} source={preview}/>}

            <TextInput style={styles.input} 
                       autoCorrect={false}
                       autoCapitalize="none"
                       placeholder="Nome do Autor"
                       placeholderTextColor="#999"
                       value={author}
                       onChangeText={setAuthor}
            />
            <TextInput style={styles.input} 
                       autoCorrect={false}
                       autoCapitalize="none"
                       placeholder="Local da Foto"
                       placeholderTextColor="#999"
                       value={place}
                       onChangeText={setPlace}
            />
            <TextInput style={styles.input} 
                       autoCorrect={false}
                       autoCapitalize="none"
                       placeholder="Descrição da Foto"
                       placeholderTextColor="#999"
                       value={description}
                       onChangeText={setDescription}
            />
            <TextInput style={styles.input} 
                       autoCorrect={false}
                       autoCapitalize="none"
                       placeholder="HashTags"
                       placeholderTextColor="#999"
                       value={hashtags}
                       onChangeText={setHashTags}
            />

            <TouchableOpacity style={styles.shareButton} onPress={handleSubmit}>
               <Text style={styles.shareButtonText}> Compartilhar </Text>
            </TouchableOpacity>      
          </KeyboardAvoidingView>
        )    
    }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },
  
    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },
  
    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },
  
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },
  
    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
  });
  