import { createConfiguration, ServerConfiguration, ThoughtSpotRestApi } from "@thoughtspot/rest-api-sdk";

export const createClientWithoutAuth = (host: string) => {
    host = host.replace("#/","").replace("#","");
    if (host.endsWith('/')) {
        host = host.slice(0, -1);
    }
    const config = createConfiguration({
      baseServer: new ServerConfiguration(host, {}),
    });
    const tsRestApiClient = new ThoughtSpotRestApi(config);
    return tsRestApiClient;
};
