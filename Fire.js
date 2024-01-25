import firebase from 'firebase';
import 'firebase/firestore';
class Fire{
    uploadPhotoAsync = async uri =>{
        let UID = firebase.auth().currentUser.uid;
        const path = `users/`+UID+`/photos/${Date.now()}.jpg`
        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()
            let upload = firebase.storage().ref(path).put(file)
            upload.on('state_changed', snapshot => {

            }, err => {
                rej(err)
            }, async () => {
                const url = await upload.snapshot.ref.getDownloadURL()
                res(url)
            })
        })
    }
    addPhoto = async(localUri,itemName,price)=>{
        const remoteUri = await this.uploadPhotoAsync(localUri)
        let UID = firebase.auth().currentUser.uid;
        return new Promise((res,rej)=>{
            firebase.database().ref(`users/`+UID+`/photos`).push({
                timestamp:this.timestamp,
                image:remoteUri,
                item: itemName,
                cost: price
            })
            this.firestore.collection('photos').add({
                timestamp:this.timestamp,
                image:remoteUri,
                item: itemName,
                cost: price
            })
            .then(ref=>{
                res(ref)
            })
            .catch(err=>{
                rej(err)
            })
        })
    }
    get firestore(){
        return firebase.firestore()
    }
    get timestamp(){
        return Date.now()
    }
    
    
}

Fire.shared=new Fire();
export default Fire;

