import Realm from 'realm';

class UserReflection extends Realm.Object<UserReflection> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserReflection',
        primaryKey: '_id',
        properties: {
            _id: 'uuid',
            date: 'date',
            title: 'string',
            notes: 'string',
            is_shared: 'bool',
            likes: { type: 'int', optional: true },
        },
    };
}

export default UserReflection;


