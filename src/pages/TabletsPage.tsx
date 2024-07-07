import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { NotFoundInfo } from '../components/NotFoundInfo/NotFoundInfo';

export const TabletsPage = () => (
  <div className="container">
    <BreadCrumbs breadCrumbsItems={[{ name: 'Tablets', slug: '/tablets' }]} />

    <NotFoundInfo text="Tablets not found" />
  </div>
);
