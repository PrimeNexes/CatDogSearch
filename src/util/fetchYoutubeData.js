import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { get } from 'lodash';
import { addData } from '../action';
import { CONSTANTS } from '../constants';
import store from '../store';


export function fetchYoutubeData({searchQuery}){

    const API_KEY = CONSTANTS.YOUTUBE_API;
    const url =`https://youtube.googleapis.com/youtube/v3/search?maxResults=1&q=${searchQuery}&key=${API_KEY}`;
    //console.log(url)
    const gotData = [];
    axios.get(url).then((res) => {
        const items = get(res.data,'items',[]);
        items.forEach((item)=>{
            const videoID =get(item,'id.videoId','');
            gotData.push(videoID);      
        })
         store.dispatch(addData(gotData))
    })
    .catch((err) => alert(err));
    
};

async function serachforLocalStore(search){
    console.log("ASYNC STORE")
    if(search === 'dogs'){
       const data = await AsyncStorage.getItem('GET_DOGS')
       console.log(addData(data))
       //store.dispatch(addData(data))
       return data || false
    }

    if(search === 'cats'){
        const data = await AsyncStorage.getItem('GET_CATS')
        //store.dispatch(addData(data))
        return data || false
    }

}
