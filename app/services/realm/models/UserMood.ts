import Realm from 'realm';

class UserMood extends Realm.Object<UserMood> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserMood',
        primaryKey: '_id',
        properties: {
            _id: 'uuid',
            date: 'date',
            mood: 'string',
            notes: 'string',
            is_shared: 'bool',
            tags: { type: 'list', optional: true, objectType: 'string' },
            likes: { type: 'int', optional: true },
            hub_id: { type: 'int', optional: true },
        },
    };
}

export default UserMood;
