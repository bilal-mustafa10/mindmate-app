import Realm from 'realm';

class UserShortcut extends Realm.Object<UserShortcut> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserShortcut',
        primaryKey: '_id',
        properties: {
            _id: 'uuid',
            shortcut_id: 'int',
        },
    };
}

export default UserShortcut;


