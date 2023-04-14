import Realm from 'realm';

class UserAssessment extends Realm.Object<UserAssessment> {
    _id!: Realm.BSON.UUID;
    static schema = {
        name: 'UserAssessment',
        primaryKey: '_id',
        properties: {
            _id: 'uuid',
            date: 'date',
            type: 'string',
            score: { type: 'int', optional: true },
            result: { type: 'string', optional: true },
            answers: { type: 'list', optional: true, objectType: 'int' },
        },
    };
}

export default UserAssessment;
