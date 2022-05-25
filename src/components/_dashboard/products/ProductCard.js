import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const [isOpen, setOpen] = useState(false);
  const { name, cover, price, colors, status, priceSale, videoUrl, description } = product;

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay={false}
        isOpen={isOpen}
        videoId={videoUrl}
        onClose={() => setOpen(false)}
      />

      <Card onClick={() => setOpen(true)}>
        <Box sx={{ pt: '50%', position: 'relative' }}>
          {status && (
            <Label
              variant="filled"
              color={(status === 'sale' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase'
              }}
            >
              {status}
            </Label>
          )}
          <ProductImgStyle alt={name} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>

          <Stack direction="column" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                {description}
              </Typography>
            </Typography>
            {/* {price && price > 0 && (
              <Box
                sx={{
                  padding: '0.5rem',
                  align: 'center'
                }}
              >
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through'
                  }}
                >
                  {priceSale && priceSale > 0 && fCurrency(priceSale)}
                </Typography>
                &nbsp;
                {fCurrency(price)}
              </Box>
            )} */}
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
