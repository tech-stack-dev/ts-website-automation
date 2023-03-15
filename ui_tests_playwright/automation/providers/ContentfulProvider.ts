export default class ContentfulProvider {
    public static SpaceId(): string {
        return <string>process.env.CONTENTFUL_SPACE_ID;
    }

    public static AccessToken(): string {
        return <string>process.env.CONTENTFUL_ACCESS_TOKEN;
    }

    public static Env(): string {
        return <string>process.env.CONTENTFUL_ENV;
    }
}