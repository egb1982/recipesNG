import { Type } from '@angular/compiler';
import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Pipe({ name: 'imageToUrl'})

export class ImageToUrlPipe implements PipeTransform  {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: ArrayBuffer):SafeUrl {

    let server: string = environment.API_URL;

    if ((typeof value) === "string") return value;
    if (!value) return server +'/no-image.png';

    let TYPED_ARRAY = new Uint8Array(value);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    let base64String = btoa(STRING_CHAR);
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
  }
}
