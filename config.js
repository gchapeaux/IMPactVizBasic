"use strict";

module.exports = {
  // set enviroment variables or hard-code here
  credentials: {
    client_id: 'CLIENT_ID',
    client_secret: 'CLIENT_SECRET'
  },
  bucketName: 'dvimpctbucket',
  autoRefresh: true,
  scopes: {
    // Required scopes for the server-side application
    internal: ['bucket:create', 'bucket:read', 'bucket:update', 'bucket:delete', 'data:read', 'data:create', 'data:write', 'data:search'],
    // Required scope for the client-side viewer
    public: ['viewables:read', 'data:read']
  }
};