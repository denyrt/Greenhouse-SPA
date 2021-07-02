import { LightingController } from "./lighting-controller";
import { TemperatureController } from "./temperature-controller";
import { WetController } from "./wet-controller";

export class Greenhouse {
    id: string = '';
    name: string = '';

    get controllersCount() {
        return this.temperatureControllers.length
        + this.lightingControllers.length
        + this.wetControllers.length;
    }

    temperatureControllers: TemperatureController[] = [];
    lightingControllers: LightingController[] = [];
    wetControllers: WetController[] = [];
}