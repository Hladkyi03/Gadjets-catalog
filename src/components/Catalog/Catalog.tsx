import './Catalog.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../ProductsList/ProductsList';
import { useEffect } from 'react';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  products: Product[];
};

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const navigate = useNavigate();

  const perPage
    = searchParams.get('perPage') === 'all'
      ? products.length
      : Number(searchParams.get('perPage')) || 16;

  const sort = searchParams.get('sort') || 'age';

  const filterQuery = searchParams.get('query') || '';

  let visibleProducts;

  useEffect(() => {
    navigate({ search: getSearchWith(searchParams, 'page', '1').toString()});
  }, [perPage]);

  switch (sort) {
    case 'age':
      visibleProducts = products.sort((product1, product2) => {
        return product2.year - product1.year;
      });
      break;

    case 'price':
      visibleProducts = products.sort((product1, product2) => {
        return product1.price - product2.price;
      });
      break;

    case 'name':
      visibleProducts = products.sort((product1, product2) => {
        return product1.name.localeCompare(product2.name);
      });
      break;

    default:
      visibleProducts = products.sort((product1, product2) => {
        return product1.year - product2.year;
      });
      break;
  }

  visibleProducts = visibleProducts.filter((item) => (
    item.name.toLowerCase().includes(filterQuery.toLowerCase())));

  return (
    <div className="catalog">
      <div className="container">
        {visibleProducts.length > 0 ? (
          <ProductsList
            products={visibleProducts}
            total={visibleProducts.length}
            currentPage={page}
            perPage={perPage}
          />
        ) : (
          <h2 className="catalog__no-results">No search results</h2>
        )}
      </div>
    </div>
  );
};