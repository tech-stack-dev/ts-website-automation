import ContentfulProvider from "../providers/ContentfulProvider";

class ContentfulUtils {
    contentful = require('contentful-management')

    async GetEnvironment() {
        var client = this.contentful.createClient({
            accessToken: ContentfulProvider.AccessToken,
        })
        var space = await client.getSpace(ContentfulProvider.SpaceId);
        var environment = await space.getEnvironment(ContentfulProvider.Env);
        return environment;
    }

    async CreateTag(tagId: string, tagName: string, publishType: string = "public") {
        var environment = await this.GetEnvironment();
        await environment.createTag(tagId, tagName, publishType);
    }

    async CreateAndPublishCareerDescription(descriptionId: string) {
        var environment = await this.GetEnvironment();
        await environment.createEntryWithId('careerDescription', descriptionId, this.descriptionFields);
        var createdCareerDescriptionEntry = await environment.getEntry(descriptionId);
        await createdCareerDescriptionEntry.publish();
    }

    async CreateAndPublishCareer(careerId: string, descriptionId: string, tagId: string = "direction_longSoftwareDataManager") {
        var environment = await this.GetEnvironment();
        var careerFieldsWithDescriptionAndTag = this.careerFields;
        careerFieldsWithDescriptionAndTag.fields.careerDescription["en-US"].sys.id = descriptionId;
        careerFieldsWithDescriptionAndTag.metadata.tags[0].sys.id = tagId;
        await environment.createEntryWithId('career', careerId, this.careerFields);
        var createdCareer = await environment.getEntry(careerId);
        await createdCareer.publish();
    }

    async UnpublishCareer(careerId:string) {
        var environment = await this.GetEnvironment();
        var createdCareer = await environment.getEntry(careerId)
        createdCareer.unpublish();
    }

    async DeleteCareer(careerId:string) {
        var environment = await this.GetEnvironment();
        var createdCareer = await environment.getEntry(careerId)
        createdCareer.delete();
    }

    async DeleteTag(tagId: string) {
        var environment = await this.GetEnvironment();
        var tag = await environment.getTag(tagId)
        tag.delete();
    }

    careerFields = {
        fields: {
            name: {
                "en-US": "TypeScript test career",
                "uk-UA": "Тайпскріпт тест"
            },
            careerDescription: {
                "en-US": {
                    sys: {
                        type: "Link",
                        linkType: "Entry",
                        id: "typeScriptTestDescriptionId"
                    },
                }
            },
            description: {
                "en-US": "TypeScript test career",
                "uk-UA": "Тайпскріпт тест"
            }
        },
        metadata: {
            tags: [{
                sys: {
                    type: "Link",
                    linkType: "Tag",
                    id: "direction_longSoftwareDataManager"
                }
            }]
        }
    }

    descriptionFields = {
        fields: {
            aboutTheProject: {
                "en-US": "TypeScript test",
                "uk-UA": "Тайпскріпт тест"
            },
            aboutTheRole: {
                "en-US": "TypeScript test",
                "uk-UA": "Тайпскріпт тест"
            },
            title: {
                "en-US": "TypeScript test",
                "uk-UA": "Тайпскріпт тест"
            },
            youWill: {
                "en-US": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "TypeScript test",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                },
                "uk-UA": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "Тайпскріпт тест",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                }
            },
            youAre: {
                "en-US": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "TypeScript test",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                },
                "uk-UA": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "Тайпскріпт тест",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                }
            },
            weWill: {
                "en-US": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "TypeScript test",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                },
                "uk-UA": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "Тайпскріпт тест",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                }
            },
            weAre: {
                "en-US": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "TypeScript test",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                },
                "uk-UA": {
                    data: {},
                    content: [] = [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "Тайпскріпт тест",
                                    nodeType: "text",
                                },
                            ],
                            nodeType: "paragraph",
                        },
                    ],
                    nodeType: "document"
                }
            },
            technologyStack: {
                "en-US": [] = ["TypeScript test", "Create this via ts is challenge for me"]
            },
            slug: {
                "en-US": "TypeScript_test-v1"
            }
        }
    }
}

var contentfulUtils = new ContentfulUtils();
export { contentfulUtils }