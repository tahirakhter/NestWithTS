import { TransformFnParams } from "class-transformer";
import { isEmpty } from "lodash";

export const transformPhone = (params: TransformFnParams) => {
  return isEmpty(params.obj[params.key])
    ? null
    : params.obj[params.key].replace(/\D/g, "");
};
