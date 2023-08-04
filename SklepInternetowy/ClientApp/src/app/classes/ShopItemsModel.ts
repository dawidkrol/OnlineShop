import { CategoryModel } from './CategoryModel';
import { ImageModel } from './ImageModel';

export interface ShopItemsModel {
  id: string;
  name: string;
  category: CategoryModel;
  description: string;
  price: number;
  quantity: number;
  images: ImageModel[];
  createdDate: Date;
  lastUpdateDate: Date;
}
