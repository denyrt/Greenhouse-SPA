export class PutToGreenhouseModel {
    constructor(controllerId: string = '', greenhouseId: string | null = null) {
        this.controllerId = controllerId;
        this.greenhouseId = greenhouseId;
    }

    controllerId: string;
    greenhouseId: string | null ;
}