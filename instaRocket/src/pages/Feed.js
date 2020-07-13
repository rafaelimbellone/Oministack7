import React, {Component} from 'react';
import {View, 
        Text,
        Image,
        TouchableOpacity,
        FlatList, 
        StyleSheet,
    } from 'react-native';
import io from 'socket.io-client';
import api from '../services/api';
import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';
export default class Feed extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: (
           <TouchableOpacity onPress={() => navigation.navigate('New')}>
               <Image style={{marginRight: 15}} source={camera} />
           </TouchableOpacity>
        ),
    });

    state = {
        feed: [],
    };

    async componentDidMount(){
        this.registerToSocket();
        const response = await api.get('posts');
        this.setState({feed: response.data});
    }

    registerToSocket = () =>{
        const socket = io('http://192.168.1.33:1333');

        socket.on('post', newPost => {
            this.setState({feed: [newPost, ...this.state.feed]});
        })

        socket.on('like', likePost => {
            this.setState({feed: this.state.feed.map(post => 
                            post._id === likePost._id ? likePost : post)
            });
        })
    }

    handleLike = id => {
        api.post(`posts/${id}/likes`);
    }

    render(){
        return (
        <View style={styles.container}>
          <FlatList 
              data={this.state.feed}
              keyExtractor={post => post._id}
              renderItem={({ item }) => (
              <View style={styles.feedItem}>
                  <View style={styles.feedItemHeader}>
                    <View style={styles.userInfo}>
                      <Text style={styles.name}>{item.author}</Text>
                      <Text style={styles.place}>{item.place}</Text>
                    </View>
                    <Image source={more}/>
                  </View>
                  
                  <Image style={styles.feedImage} source={{uri : `http://192.168.1.33:1333/files/${item.image}`}}/>
                  <View style={styles.feedItemFooter}>
                      <View style={styles.actions}>
                          <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                            <Image source={like}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.action} onPress={() => {}}>
                            <Image source={comment}/>
                          </TouchableOpacity>                            
                          <TouchableOpacity style={styles.action} onPress={() => {}}>
                            <Image source={send}/>
                          </TouchableOpacity>
                      </View>
                      <Text style={styles.like}>{item.likes} Curtidas</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <Text style={styles.hashtags}>{item.hashtags}</Text>
                  </View>
                </View>
              )}
          />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    feedItem:{
      marginTop:20,
    },
    feedItemHeader: {
       flexDirection:'row',
       paddingHorizontal: 15,
       justifyContent:"space-between",
       alignItems: 'center',
    },
    
    userInfo:{

    },
    name: {
       fontSize: 16,
       color:'#000',
       fontWeight:'bold',
    },
    place:{
        fontSize: 13,
        color:'#666',
        marginTop:2,
    },
    feedImage: {
        width: '100%',
        height: 680,
        marginVertical: 15,
    },
    feedItemFooter:{
        paddingHorizontal: 15,
    },
    actions:{
       flexDirection: 'row',
    },
    action:{
       marginRight: 8,
    },

    like:{
      marginTop:15,
      fontWeight:'bold',
      color:'#000'
    },
    description:{
       lineHeight:18,
       color:'#000',
    },
    hashtags:{
       color:'#7159c1',
    }

});