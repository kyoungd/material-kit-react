import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import ModalVideo from 'react-modal-video';

ExpertCard.propTypes = {
  product: PropTypes.object
};

export default function ExpertCard({ product }) {
  const [isOpen, setOpen] = useState(false);
  const { name, cover, videoUrl, description } = product;

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
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
          <Button size="small" onClick={() => setOpen(true)}>
            Video
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
