import { Color } from "./step1_model";
import { Config } from "./step2_Model";

export interface Summary{
    code : string;
    description : string;
    color : Color;
    config : Config;
    towHitch : boolean;
    yoke : boolean;
}