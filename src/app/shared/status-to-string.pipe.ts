import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "statusName" })
export class StatusToString implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return "inactive";
        break;
      case 1:
        return "upcomming";
        break;
      case 2:
        return "ongoing";
        break;
      case 3:
        return "finnished";
        break;
      default:
        break;
    }
  }
}
