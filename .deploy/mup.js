module.exports = {
  servers: {
    one: {
      host: '207.154.242.151',
      username: 'root',
      pem: 'pem/ssh.ppk'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    name: 'ankapower-mug',
    path: '../',

    servers: {
      one: {},
    },

    volumes: {
	  // passed as '-v /host/path:/container/path' to the docker run command
	  '/var/anka_volumes/ankapower-mug': '/persistent'
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://mug.ankawiser.com',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local'
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  proxy: {
    domains: 'mug.ankawiser.com'
  }
};
