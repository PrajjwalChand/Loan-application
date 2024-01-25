import constants from 'expo-constants';
import * as permissions from 'expo-permissions';

class UserPermissions {
    getPermissionAsync = async() => {
        if(constants.Platform.android){
            const {status} = await permissions.askAsync(permissions.CameraRoll);
            if(status!='granted'){
                alert('Sorry,we need camera roll permissions to make it work');
            }
        }
    }
}

export default new UserPermissions();