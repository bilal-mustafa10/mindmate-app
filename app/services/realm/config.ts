import {createRealmContext} from '@realm/react';
import UserShortcut from './models/UserShortcut';
import UserActivity from './models/UserActivity';
import UserActivityFavourite from './models/UserActivityFavourite';
import UserMood from './models/UserMood';
import UserData from './models/UserData';
export const RealmContext = createRealmContext({
    schema: [UserShortcut, UserActivity, UserActivityFavourite, UserMood, UserData],
    schemaVersion: 10,
});
