import Realm from 'realm';

class UserActivity extends Realm.Object<UserActivity> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserActivity',
        primaryKey: '_id',
        properties: {
            _id: 'uuid',
            activity_id: 'int',
            completed_at: 'date',
            photos: { type: 'string[]', optional: true },
            is_shared: 'bool',
            likes: { type: 'int', optional: true },
            hub_id: { type: 'int', optional: true },
        },
    };
}

export default UserActivity;
