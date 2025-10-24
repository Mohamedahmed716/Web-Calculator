import { bootstrapApplication } from '@angular/platform-browser';
import { Calculator } from './app/components/calculator/calculator';
import { appConfig } from './app/app.config';

bootstrapApplication(Calculator, appConfig)
  .catch(err => console.error(err));
