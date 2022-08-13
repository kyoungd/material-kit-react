import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Tooltip,
  Typography
} from '@mui/material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import PropTypes from 'prop-types';
import ModalVideo from 'react-modal-video';
import { Link as RouterLink } from 'react-router-dom';

ExpertCard.propTypes = {
  product: PropTypes.object
};

export default function ExpertCard({ product }) {
  const [isOpen, setOpen] = useState(false);
  const { id, name, cover, videoUrl, description, link, status } = product;

  const learnMoreText = status === 'active' ? 'Subscription' : 'Learn More';

  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay={false}
        isOpen={isOpen}
        videoId={videoUrl}
        onClose={() => setOpen(false)}
      />
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt={name} height="140" image={cover} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <CardActions>
            {status === 'active' && (
              <Tooltip title="already a subscriber" sx={{ paddingRight: 0.5 }}>
                <DataSaverOnIcon />
              </Tooltip>
            )}
            <Link to={link} state={{ id }} color="inherit" underline="hover" component={RouterLink}>
              <Typography variant="subtitle2" noWrap>
                {learnMoreText}
              </Typography>
            </Link>
            <Button size="small" onClick={() => setOpen(true)}>
              Video
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
