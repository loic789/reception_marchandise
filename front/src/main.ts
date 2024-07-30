import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as LiveUpdates from '@capacitor/live-updates';

import { AppModule } from './app/app.module';




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
