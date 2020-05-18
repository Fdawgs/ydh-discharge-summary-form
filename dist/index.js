"use strict";var _require=





require("./test.config"),activeDirectoryConfig=_require.activeDirectoryConfig,fhirConConfig=_require.fhirConConfig,helmetConfig=_require.helmetConfig,postgresqlConfig=_require.postgresqlConfig,serverConfig=_require.serverConfig;
var Server=require("./server/server");
require("regenerator-runtime");

new Server(serverConfig).
configureHelmet(helmetConfig).
configurePostgresqlgres(postgresqlConfig).
configureActiveDirectory(activeDirectoryConfig).
configureMiddleware().
configureFhirRouting(fhirConConfig).
configureRouting(fhirConConfig).
listen(serverConfig.port);