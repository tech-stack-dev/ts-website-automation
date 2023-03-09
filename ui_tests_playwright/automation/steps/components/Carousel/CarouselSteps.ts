import { Locator, expect } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";
import ContainerById from "../../../components/Container/ContainerById";
import InfoCarouselIds from "../../../identifiers/InfoCarousel";
import PhotoCarousel from "../../../identifiers/PhotoCarousel";

export class CarouselSteps {

    public async checkInfoCarouselItem(order:string, title:string, carouselIdentifier: string) {
        let section = await driver.component(ContainerById, carouselIdentifier);
        let infoCarouselItems = await section.getByTestId(InfoCarouselIds.CrouselItem).all();
        let index = Number(order) - 1;
        expect(await infoCarouselItems[index].locator(InfoCarouselIds.Order).textContent()).toContain(order);
        expect(await infoCarouselItems[index].locator(InfoCarouselIds.Title).textContent()).toContain(title);
    } 

    public async checkPhotosAmountInPhotoCarousel(amount:number, sectionIdentifier: string, carouselIdentifier: string) {
        let section = await driver.component(ContainerById, sectionIdentifier);
        let photos =await section.getByTestId(PhotoCarousel.CrouselItem).all();
        expect( photos.length).toEqual(amount);
    }

    public async getCarousel(carouselIdentifier: string){
        return await driver.component(ContainerById, carouselIdentifier);
    }

    public async checkPhotoImageInCarousel(carouselIdentifier: string, filename: string){}
}

var carouselSteps = new CarouselSteps();

export { carouselSteps };