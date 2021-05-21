import { Injectable } from "@angular/core";
import { Product } from "@spartacus/core";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  getProducts(): Product[] {
    return [
      {
        name: 'DSLR-A100H',
        price: {
        value: 1086.00,
         },
       url: "../../assets/images/descarga.jpeg",
       description: "Digital SLR Camera DSLR-A100H"
     },
      {
        name: 'Alpha 350',
        price: {
          value: 1321.54,
        },
        url: "../../assets/images/descarga (1).jpeg",
        description: "D14.2 megapixel Digital Single Lens Reflex (D-SLR) camera - body only"
      }
    ];
  }
}
