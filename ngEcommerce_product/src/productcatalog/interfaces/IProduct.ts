export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: File | string;  // image can be a File (for uploading) or a string (for the URL)
  quantity: number;
}

