export class CreateBirdDTO {
    readonly name: string;
    readonly description: string;
    readonly images: Array<string>;
    readonly thumbnail: string;
    readonly size: string;
    readonly coordinates: Object;
    readonly color: Array<string>;
    readonly information: Object;
}
