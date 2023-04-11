import Realm from 'realm';

class Photo extends Realm.Object {
    static schema = {
        name: 'Photo',
        properties: {
            title: 'string',
            file: 'string',
            width: 'int',
            height: 'int',
        },
    };
}

export default Photo;
