import Realm from 'realm';

class UserData extends Realm.Object<UserData> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserData',
        primaryKey: 'username',
        properties: {
            username: 'int',
            first_name: 'string',
            last_name: 'string',
        },
    };
}

export default UserData;


