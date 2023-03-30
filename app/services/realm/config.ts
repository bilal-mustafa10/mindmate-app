import {createRealmContext} from '@realm/react';
import UserShortcut from './models/UserShortcut';
export const RealmContext = createRealmContext({
    schema: [UserShortcut],
    schemaVersion: 1,
});
