export enum Environment { Staging, Production }

export default class EnvProvider {

    public static get Environment(): Environment {
        switch (process.env.TEST_ENV) {
            case "staging": {
                return Environment.Staging;
            }
            case "production": {
                return Environment.Production;
            }
            default: {
                throw new Error(`Unknown environment. Environment: ${process.env.TEST_ENV}`);
            }
        }
    }
}