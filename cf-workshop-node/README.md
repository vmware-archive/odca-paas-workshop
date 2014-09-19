Pivotal CF Workshop - Node.js
================================

Introduction
------------

This is a Node.js version of the sample application for the Pivotal CF Workshop.
It is intended to demonstrate some of the basic functionality of Pivotal
CF:

 * Pivotal CF target, login, and push
 * Pivotal CF environment variables
 * Pivotal CF service variables
 * Scaling, router and load balancing
 * Health manager and application restart

Services, Packaging, and Deploying
--------------------------------

###MongoDB Service

This application uses a MongoDB database for data services.  The Node.js buildpack doesn't support autoconfiguration like the Java buildpack does.  So, if you are pushing
this application to Cloud Foundry, you will need to create a MongoDB service called 
`cf_workshop_mongo` prior to pushing the application, or the startup will fail.  The 
service name is set in `manifest.yml`

By default, the application expects a MongoDB service from Mongo Lab (the PWS MongoDB 
service), and the application will use the first one that it finds.  If you use a 
different service, find this line in app.js:

	var uri = vcap_services != undefined && vcap_services.mongolab != undefined ? vcap_services.mongolab[0].credentials.uri : 'localhost:27017/cf-workshop-node';

and change all occurences of `vcap_services.mongolab` to `vcap_services.<service-name>`.  The service name can be tricky; it's not the name of the service that you create, it's 
the provider name of the service broker.

If you are running the application locally, install MongoDB, and create a database named
`cf-workshop-node`, or change the last argument in the above line to your MongoDB url.

###Seeding data

There is a file called `data.json` that can be used as sample data.  Import this data with the MongoDB client of your choice (mongo, mongoimport, etc.).

###Bundling node modules

The Node modules can be bundled within the application itself, as a result of running `npm install` on the application.  This ensures the right versions of the modules, but can also lead to a very large package to push (~7MB).  The Node.js buildpack supports bundling as part of staging, so if you want to reduce the package size that is being pushed, delete the `node_modules` directory before pushing.  The Node.js buildpack will then automatically run `npm install` as part of staging.

###Pushing / Running

Once the MongoDB service or instance is created and the manifest and `app.js` are updated, simply push or run this application.  If running on Cloud Foundry:

    cf push

To run locally:

    npm start
