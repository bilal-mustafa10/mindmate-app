import {createRealmContext} from '@realm/react';
import UserShortcut from './models/UserShortcut';
import UserActivity from './models/UserActivity';
import UserActivityFavourite from './models/UserActivityFavourite';
export const RealmContext = createRealmContext({
    schema: [UserShortcut, UserActivity, UserActivityFavourite],
    schemaVersion: 5,
});
