import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { isEmpty } from "lodash";

@Injectable()
export class DataTransformService implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return isEmpty(value) ? null : value.replace(/\D/g, "");
  }
}
