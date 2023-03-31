import {createRealmContext} from '@realm/react';
import UserShortcut from './models/UserShortcut';
import UserActivity from './models/UserActivity';
export const RealmContext = createRealmContext({
    schema: [UserShortcut, UserActivity],
    schemaVersion: 4,
});
