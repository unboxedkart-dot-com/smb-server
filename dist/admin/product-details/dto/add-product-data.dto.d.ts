export declare class AddProductDataDto {
    productCode: string;
    categoryCode: string;
    category: string;
    brandCode: string;
    brand: string;
    highlights: string[];
    title: string;
    modelNumber: string;
    modelCode: string;
    processors: [
        {
            code: string;
            title: string;
        }
    ];
    rams: [
        {
            code: string;
            title: string;
        }
    ];
    colors: [
        {
            code: string;
            title: string;
        }
    ];
    storages: [
        {
            code: string;
            title: string;
        }
    ];
}
