import type Bottle from 'bottlejs';
import type { ConnectDecorator } from '../../container/types';
import { withoutSelectedServer } from '../../servers/helpers/withoutSelectedServer';
import { RealTimeUpdatesSettings } from '../RealTimeUpdatesSettings';
import {
  setRealTimeUpdatesInterval,
  setShortUrlCreationSettings,
  setShortUrlsListSettings,
  setTagsSettings,
  setUiSettings,
  setVisitsSettings,
  toggleRealTimeUpdates,
} from '../reducers/settings';
import { SettingsFactory } from '../Settings';
import { ShortUrlCreationSettings } from '../ShortUrlCreationSettings';
import { ShortUrlsListSettings } from '../ShortUrlsListSettings';
import { TagsSettings } from '../TagsSettings';
import { UserInterfaceSettings } from '../UserInterfaceSettings';
import { VisitsSettings } from '../VisitsSettings';

export const provideServices = (bottle: Bottle, connect: ConnectDecorator) => {
  // Components
  bottle.factory('Settings', SettingsFactory);
  bottle.decorator('Settings', withoutSelectedServer);
  bottle.decorator('Settings', connect(null, ['resetSelectedServer']));

  bottle.serviceFactory('RealTimeUpdatesSettings', () => RealTimeUpdatesSettings);
  bottle.decorator(
    'RealTimeUpdatesSettings',
    connect(['settings'], ['toggleRealTimeUpdates', 'setRealTimeUpdatesInterval']),
  );

  bottle.serviceFactory('ShortUrlCreationSettings', () => ShortUrlCreationSettings);
  bottle.decorator('ShortUrlCreationSettings', connect(['settings'], ['setShortUrlCreationSettings']));

  bottle.serviceFactory('UserInterfaceSettings', () => UserInterfaceSettings);
  bottle.decorator('UserInterfaceSettings', connect(['settings'], ['setUiSettings']));

  bottle.serviceFactory('VisitsSettings', () => VisitsSettings);
  bottle.decorator('VisitsSettings', connect(['settings'], ['setVisitsSettings']));

  bottle.serviceFactory('TagsSettings', () => TagsSettings);
  bottle.decorator('TagsSettings', connect(['settings'], ['setTagsSettings']));

  bottle.serviceFactory('ShortUrlsListSettings', () => ShortUrlsListSettings);
  bottle.decorator('ShortUrlsListSettings', connect(['settings'], ['setShortUrlsListSettings']));

  // Actions
  bottle.serviceFactory('toggleRealTimeUpdates', () => toggleRealTimeUpdates);
  bottle.serviceFactory('setRealTimeUpdatesInterval', () => setRealTimeUpdatesInterval);
  bottle.serviceFactory('setShortUrlCreationSettings', () => setShortUrlCreationSettings);
  bottle.serviceFactory('setShortUrlsListSettings', () => setShortUrlsListSettings);
  bottle.serviceFactory('setUiSettings', () => setUiSettings);
  bottle.serviceFactory('setVisitsSettings', () => setVisitsSettings);
  bottle.serviceFactory('setTagsSettings', () => setTagsSettings);
};
