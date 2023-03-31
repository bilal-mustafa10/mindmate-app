import Realm from 'realm';

class UserActivityFavourite extends Realm.Object<UserActivityFavourite> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserActivityFavourite',
        primaryKey: '_id',
        properties: {
            _id: 'uuid',
            activity_id: 'int',
        },
    };
}

export default UserActivityFavourite;


