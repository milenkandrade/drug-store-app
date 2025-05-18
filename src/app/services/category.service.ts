import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import Category from '../models/category';
import { generateUUID } from '../utils/uuid';
import Pageable from '../models/pageable';
import { createPage } from '../models/page';

export const categories: Category[] = [
  { id: generateUUID, name: 'Prescription Drugs', image_url: 'https://example.com/images/prescription.jpg' },
  { id: generateUUID, name: 'Over-the-Counter (OTC)', image_url: 'https://example.com/images/otc.jpg' },
  { id: generateUUID, name: 'Vitamins & Supplements', image_url: 'https://example.com/images/vitamins.jpg' },
  { id: generateUUID, name: 'Medical Devices', image_url: 'https://example.com/images/devices.jpg' },
  { id: generateUUID, name: 'Personal Care', image_url: 'https://example.com/images/personal_care.jpg' }
];

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategories({ size = 10, page = 1 }: Pageable){
    return of(createPage(categories, { size, page }).content);
  }
}
