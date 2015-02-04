CIRCE
========
[Under development] CIRCE is a cohort definition and syntax compiler tool for OMOP CDMv5

========

This repo contains a knockout-based UI that captures user input for specifying a cohort definition.  Clone the repo locally, and point a virtual directory from your favorite webserver to the root of the repo, and open index.html.  Please note that the app will only work if you are hosting it through HTTP due to the nature of the AMD loader (we are configured to use curl.js).

This repo is bundled with the following javascript library dependencies:
* knockout v3.2 (but built from a a latest build from the knockout.js repo in order to get the $component binding feature)
* jquery 1.11.1
* jquery-ui 1.11.0 (all as one bundle)
* knockout-jqueryui (a set of jqueryUI to knockout bindings that we use for some of the UI elements)

The application is configured to access a WebAPI instance running locally on port 8084 (tomcat default in Netbeans IDE).

For deployment, you can alter the webAPI endpoint by editing the js/config.js property: webAPIRoot.

