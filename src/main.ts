import { bootstrapApplication } from '@angular/platform-browser';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(ProductListComponent, {
  providers: [provideHttpClient()],
});