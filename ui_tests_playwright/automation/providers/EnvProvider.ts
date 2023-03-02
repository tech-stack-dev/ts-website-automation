export enum Environment { Stg, Prod }

export default class EnvProvider {

    public static get Env(): Environment {
        switch (process.env.TEST_ENV) {
            case "staging": {
                return Environment.Stg;
            }
            case "production": {
                return Environment.Prod;
            }
            default: {
                throw new Error(`Unknown environment. Environment: ${process.env.TEST_ENV}`);
            }
        }
    }
}