import { BaseController } from "./base-controller";

export class TemperatureController extends BaseController {
    celsiusToStartAeration: number = 25;
    celsiusToFinishAeration: number = 15;

    celsiusToStartHeating: number = 5;
    celsiusToFinishHeating: number = 10;

    bottomEdgeToAlert: number = 0;
    upperEdgeToAlert: number = 30;
}