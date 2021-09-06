import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { get } from 'lodash';
import { addData } from '../action';
import { CONSTANTS } from '../constants';


export function fetchYoutubeData({searchQuery}){
    return(dispatch)=>{
    const API_KEY = CONSTANTS.YOUTUBE_API;
    const url =`https://youtube.googleapis.com/youtube/v3/search?maxResults=5&q=${searchQuery}&key=${API_KEY}`;
    const gotData = [];
    axios.get(url).then((res) => {
        const items = get(res.data,'items',[]);
        items.forEach((item)=>{
            const videoID =get(item,'id.videoId','');
            gotData.push(videoID);      
        })
         dispatch(addData(gotData))
    })
    .catch((err) => alert(err));
}
};

async function serachforLocalStore(search){
    console.log("ASYNC STORE")
    if(search === 'dogs'){
       const data = await AsyncStorage.getItem('GET_DOGS')
       return data || false
    }

    if(search === 'cats'){
        const data = await AsyncStorage.getItem('GET_CATS')
        return data || false
    }

}
