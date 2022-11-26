import { useFormik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';

// material
import { Container, Stack } from '@mui/material';
// components
import {
  ProductSort,
  ProductList,
  // ProductCartWidget,
  ProductFilterSidebar
} from './_dashboard/products';
//
// import EXPERTS from '../_mocks_/experts';

// ----------------------------------------------------------------------

ExpertShop.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default function ExpertShop(props) {
  const [openFilter, setOpenFilter] = useState(false);

  const EXPERTS = props.data;
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Container>
      {/* <Typography variant="h4" sx={{ mb: 5 }}>
        TRADE EXPERTS
      </Typography> */}

      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilterSidebar
            formik={formik}
            isOpenFilter={openFilter}
            onResetFilter={handleResetFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack>
      </Stack>

      <ProductList products={EXPERTS} />
      {/* <ProductCartWidget /> */}
    </Container>
  );
}
