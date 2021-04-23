/**************************/
/* TYPES */
/**************************/
export type Token = {
    id: number,
    owner_id: string,
    metadata: any
}

@nearBindgen
export class LandCadastre{

    constructor(
        public formatted_address: string,
        public geometry: string

    ) { }

}


@nearBindgen
export class LandPoint {
    lat: i32
    lng: i32
}

// @nearBindgen
// export class Geometry {
//     location: {
//         lat: i32,
//         lng: i32
//         location_type: string,
//         viewport: {
//             northeast: {
//                 lat: i32,
//                 lng: i32
//             },
//             southwest: {
//                 lat: i32,
//                 lng: i32
//             }
//         }
//     }
// }