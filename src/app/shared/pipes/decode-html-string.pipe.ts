import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeHtmlString'
})
export class DecodeHtmlStringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const element = document.createElement('p');
    element.innerHTML = value;

    return element?.innerText;
  }

}
