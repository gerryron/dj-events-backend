'use strict';

/**
 * event router.
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/events/me',
      handler: 'event.me',
      config: {},
    },
  ],
};