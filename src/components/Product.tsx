export type ProductItem = {
  id?: string | number;
  name: string;
  desc: string;
  price: number;
  imgLink: string;
};

type Props = {
  product: ProductItem;
};

const Product = ({ product }: Props) => {
  return (
    <div className="border-gray-200 border p-4 rounded-lg max-w-md">
      <img
        src={product.imgLink}
        className="w-full aspect-video bg-gray-200 rounded-lg mb-3"
      />
      <p className="text-lg font-bold mb-3">{product.name}</p>
      <p className="mb-3">{product.desc}</p>

      <p className="text-lg font-bold">N{product.price}</p>
    </div>
  );
};

export default Product;
