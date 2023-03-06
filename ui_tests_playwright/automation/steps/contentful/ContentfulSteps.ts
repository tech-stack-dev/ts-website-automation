import { Locator } from "@playwright/test";
import { driver } from "../../base/driver/Driver";
import { contentfulTag } from "../../dto/ContentfulDto";

class ContentfulSteps {
    public async CreateDefaultCareer() {
        contentfulTag.fillWithDefaultData();
        //var createdTag = 
    }
}

var contentfulSteps = new ContentfulSteps();

export { contentfulSteps };