import {expect} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import ContainerById from '../../../components/Container/ContainerById';
import CarouselIds from '../../../identifiers/Carousel';
import Carousel from '../../../identifiers/Carousel';

export class CarouselSteps {
	public async checkInfoCarouselItem(
		order: string,
		title: string,
		carouselIdentifier: string
	) {
		let section = await driver.component(ContainerById, carouselIdentifier);
		let infoCarouselItems = await section
			.getByTestId(CarouselIds.InfoCarousel_Item)
			.all();
		let index = Number(order) - 1;
		expect(
			await infoCarouselItems[index]
				.locator(CarouselIds.InfoCarousel_Order)
				.textContent()
		).toContain(order);
		expect(
			await infoCarouselItems[index]
				.locator(CarouselIds.InfoCarousel_Title)
				.textContent()
		).toContain(title);
	}

	public async checkPhotosAmountInPhotoCarousel(
		amount: number,
		sectionIdentifier: string
	) {
		let section = await driver.component(ContainerById, sectionIdentifier);
		let photos = await section
			.getByTestId(Carousel.PhotoCarousel_Item)
			.all();
		expect(photos.length).toEqual(amount);
	}

	public async getCarousel(carouselIdentifier: string) {
		return await driver.component(ContainerById, carouselIdentifier);
	}
}

var carouselSteps = new CarouselSteps();

export {carouselSteps};
