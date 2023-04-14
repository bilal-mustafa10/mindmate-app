import Realm from 'realm';

class UserStat extends Realm.Object<UserStat> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserStat',
        primaryKey: '_id',
        properties: {
            _id: 'uuid',
            stat_id: 'int',
        },
    };
}

export default UserStat;
