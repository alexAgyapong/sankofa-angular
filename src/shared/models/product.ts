export interface Brand {
  id: string;
  name: string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface PriceRange {
  id: string;
  maximumPrice: number;
  maximumPriceString: string;
  minimumPrice: number;
  minimumPriceString: string;
  productCount: number;
}

export interface Size {
  height: number;
  url: string;
  width: number;
}

export interface Image {
  caption: string;
  sizes: Size[];
}

export interface Link {
  href: string;
  rel: string;
  type: string;
}

export interface Product {
  brand: string;
  id: number;
  image: Image;
  links: Link[];
  maximumBv: number;
  maximumCashback: number;
  maximumCashbackString: string;
  maximumCiPoints: number;
  maximumIbv: number;
  maximumPrice: number;
  maximumPriceString: string;
  minimumPrice: number;
  minimumPriceString: string;
  name: string;
  referralUrl: string;
  shortDescription: string;
}

export interface Seller {
  id: string;
  name: string;
  productCount: number;
}

export interface ProductResult {
  brands: Brand[];
  categories: Category[];
  numberOfProducts: number;
  priceRanges: PriceRange[];
  products: Product[];
  sellers: Seller[];
}
