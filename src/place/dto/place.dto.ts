export class CreatePlaceDTO {
    readonly title: string;
    readonly description: string;
    readonly images: Array<string>;
    readonly coordinates: Object;
}
