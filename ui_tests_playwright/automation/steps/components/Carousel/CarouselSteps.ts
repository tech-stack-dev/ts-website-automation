import { Locator, expect } from "@playwright/test";
import { driver } from "../../../base/driver/Driver";
import CarouselInfoItem from "../../../components/Carousel/CarouselInfoItem";
import CarouselPhotoItem from "../../../components/Carousel/CarouselPhotoItem";
import ContainerById from "../../../components/Container/ContainerById";

export default class CarouselSteps {

    public static async checkInfoCarouselItem(order:string, title:string, carouselIdentifier: string) {
        let section = await driver.component(ContainerById, carouselIdentifier);
        let infoCarousel = await driver.component(CarouselInfoItem, "", section.Element);
        let infoCarouselItems = await infoCarousel.components() as Array<CarouselInfoItem>;
        let index = Number(order) - 1;
        expect(infoCarouselItems[index].order).toHaveText(order);
        expect(infoCarouselItems[index].title).toHaveText(title);
    } 

    public static async checkPhotosAmountInPhotoCarousel(amount:number, sectionIdentifier: string, carouselIdentifier: string) {
        let section = await driver.component(ContainerById, sectionIdentifier);
        let photos =await( await driver.component(CarouselPhotoItem, carouselIdentifier, section.Element)).blockList();
        expect( photos.length).toEqual(amount);
    }

    public static async getCarousel(carouselIdentifier: string){
        return await (await driver.component(CarouselPhotoItem, carouselIdentifier)).Element;
    }

    public static async checkPhotoImageInCarousel(carouselIdentifier: string, filename: string){}

}