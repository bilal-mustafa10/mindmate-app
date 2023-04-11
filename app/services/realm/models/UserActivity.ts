import Realm from 'realm';
import Photo from './Photo';

class UserActivity extends Realm.Object {
    static schema = {
        name: 'UserActivity',
        properties: {
            activity_id: 'int',
            completed_at: 'date',
            photos: { type: 'list', objectType: 'Photo', optional: false },
            is_shared: 'bool',
            likes: { type: 'int', optional: true },
            hub_id: { type: 'int', optional: true },
        },
    };
}

export default UserActivity;
