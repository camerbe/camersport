import { JwtHeader } from "./jwt-header";
import { JwtPayload } from "./jwt-payload";

export interface JwtDecoded {
    header:JwtHeader;
    payload:JwtPayload
}


