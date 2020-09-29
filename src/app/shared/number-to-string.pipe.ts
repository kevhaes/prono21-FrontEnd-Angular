import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "numberToString" })
export class NumberToString implements PipeTransform {
  transform(value: number): any {
    switch (value) {
      case -1:
        return "";
        break;
      case -2:
        return "No bet registred";
        break;
      // case 3:
      //   return "finnished";
      //   break;
      default:
        return value;
        break;
    }
  }
}
