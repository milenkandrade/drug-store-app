import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import Alert from '../models/alert';
import Pageable from '../models/pageable';
import { createPage } from '../models/page';
import { generateUUID } from '../utils/uuid';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private mockAlerts: Alert[] = [
  {
    id: generateUUID,
    product_id: "a2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d",
    product_name: 'Paracetamol 500mg',
    stock: 50,
    expiration_date: new Date('2025-08-10'),
    message: 'Stock adecuado',
    type: 'info',
    supplier_name: 'Farmacéutica Andina'
  },
  {
    id: generateUUID,
    product_id: "b3c4d5e6-f7a8-9b0c-1d2e-3f4a5b6c7d8e",
    product_name: 'Ibuprofeno 400mg',
    stock: 8,
    expiration_date: new Date('2025-07-05'),
    message: 'Últimas unidades',
    type: 'warning',
    supplier_name: 'Laboratorios Santa Cruz'
  },
  {
    id: generateUUID,
    product_id: "c4d5e6f7-a8b9-0c1d-2e3f-4a5b6c7d8e9f",
    product_name: 'Amoxicilina 500mg',
    stock: 0,
    expiration_date: new Date('2025-06-20'),
    message: 'Producto agotado',
    type: 'error',
    supplier_name: 'Laboratorios del Oriente'
  },
  {
    id: generateUUID,
    product_id: "d5e6f7a8-b9c0-1d2e-3f4a-5b6c7d8e9f0a",
    product_name: 'Omeprazol 20mg',
    stock: 20,
    expiration_date: new Date('2026-02-28'),
    message: 'Stock suficiente',
    type: 'info',
    supplier_name: 'Farmadel'
  },
  {
    id: generateUUID,
    product_id: "e6f7a8b9-c0d1-2e3f-4a5b-6c7d8e9f0a1b",
    product_name: 'Loratadina 10mg',
    stock: 5,
    expiration_date: new Date('2025-12-15'),
    message: 'Vence pronto',
    type: 'warning',
    supplier_name: 'Allergix Pharma'
  },
  {
    id: generateUUID,
    product_id: "f7a8b9c0-d1e2-3f4a-5b6c-7d8e9f0a1b2c",
    product_name: 'Metformina 850mg',
    stock: 12,
    expiration_date: new Date('2025-10-30'),
    message: 'Nivel de stock aceptable',
    type: 'info',
    supplier_name: 'Diabética S.A.'
  },
  {
    id: generateUUID,
    product_id: "a8b9c0d1-e2f3-4a5b-6c7d-8e9f0a1b2c3d",
    product_name: 'Aspirina 100mg',
    stock: 3,
    expiration_date: new Date('2025-05-25'),
    message: 'Stock crítico',
    type: 'warning',
    supplier_name: 'SaludPlus'
  },
  {
    id: generateUUID,
    product_id: "b9c0d1e2-f3a4-5b6c-7d8e-9f0a1b2c3d4e",
    product_name: 'Diclofenaco 50mg',
    stock: 15,
    expiration_date: new Date('2026-04-18'),
    message: 'Buen nivel de stock',
    type: 'info',
    supplier_name: 'MediPharm'
  },
  {
    id: generateUUID,
    product_id: "c0d1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f",
    product_name: 'Salbutamol Inhalador',
    stock: 7,
    expiration_date: new Date('2025-11-05'),
    message: 'Últimas unidades',
    type: 'warning',
    supplier_name: 'RespiraFácil'
  },
  {
    id: generateUUID,
    product_id: "d1e2f3a4-b5c6-7d8e-9f0a-1b2c3d4e5f6a",
    product_name: 'Insulina Humana',
    stock: 0,
    expiration_date: new Date('2025-07-12'),
    message: 'Sin inventario',
    type: 'error',
    supplier_name: 'Endocrina Lab'
  },
  {
    id: generateUUID,
    product_id: "e2f3a4b5-c6d7-8e9f-0a1b-2c3d4e5f6a7b",
    product_name: 'Atorvastatina 20mg',
    stock: 22,
    expiration_date: new Date('2026-01-22'),
    message: 'Stock alto',
    type: 'info',
    supplier_name: 'CardioSalud'
  },
  {
    id: generateUUID,
    product_id: "f3a4b5c6-d7e8-9f0a-1b2c-3d4e5f6a7b8c",
    product_name: 'Clindamicina 300mg',
    stock: 4,
    expiration_date: new Date('2025-09-08'),
    message: 'Pocas unidades',
    type: 'warning',
    supplier_name: 'Antibióticos del Norte'
  },
  {
    id: generateUUID,
    product_id: "a4b5c6d7-e8f9-0a1b-2c3d-4e5f6a7b8c9d",
    product_name: 'Pantoprazol 40mg',
    stock: 18,
    expiration_date: new Date('2026-03-12'),
    message: 'Stock suficiente',
    type: 'info',
    supplier_name: 'GastroLab'
  },
  {
    id: generateUUID,
    product_id: "b5c6d7e8-f9a0-1b2c-3d4e-5f6a7b8c9d0e",
    product_name: 'Metronidazol 500mg',
    stock: 6,
    expiration_date: new Date('2025-10-02'),
    message: 'Nivel de stock aceptable',
    type: 'info',
    supplier_name: 'AntiProto Pharma'
  },
  {
    id: generateUUID,
    product_id: "c6d7e8f9-a0b1-2c3d-4e5f-6a7b8c9d0e1f",
    product_name: 'Vitamina C 1000mg',
    stock: 30,
    expiration_date: new Date('2027-01-15'),
    message: 'Stock alto',
    type: 'info',
    supplier_name: 'NutriSalud'
  }
];

  getAlerts({ size = 10, number = 1 }: Pageable){
    return of(createPage<Alert>(this.mockAlerts, { size, number }));
  }

}
