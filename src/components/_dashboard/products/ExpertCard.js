import { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
          <CardActions disableSpacing>
            <Link to={link} state={{ id }} color="inherit" underline="hover" component={RouterLink}>
              <Typography variant="subtitle2" noWrap>
                {learnMoreText}
              </Typography>
            </Link>
            <IconButton aria-label="video" onClick={() => setOpen(true)}>
              <YouTubeIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
