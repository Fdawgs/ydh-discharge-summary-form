const {
	activeDirectoryConfig,
	fhirConConfig,
	helmetConfig,
	postgresqlConfig,
	serverConfig
} = require('./test.config');
const Server = require('./server/server');
require('regenerator-runtime');

new Server(serverConfig)
	.configureHelmet(helmetConfig)
	.configurePostgresqlgres(postgresqlConfig)
	.configureActiveDirectory(activeDirectoryConfig)
	.configureMiddleware()
	.configureFhirRouting(fhirConConfig)
	.configureRouting()
	.listen(serverConfig.port);
