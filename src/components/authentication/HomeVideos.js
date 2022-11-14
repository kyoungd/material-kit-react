import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import { Icon } from '@iconify/react';
import messageCircleOutline from '@iconify/icons-eva/message-circle-outline';
import playCircleOutline from '@iconify/icons-eva/play-circle-outline';
import personDoneOutline from '@iconify/icons-eva/person-done-outline';
// material
import { Stack, Button, Divider, Tooltip, Typography } from '@mui/material';

// ----------------------------------------------------------------------
// const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function HomeVideos() {
  // const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          WHAT IS TRADESIMP?
        </Typography>
      </Divider>

      <Stack direction="row" spacing={2}>
        <Tooltip title="Click here to learn more about us.">
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={() => window.open('https://tradesimp.netlify.app', '_blank')}
          >
            <Icon icon={messageCircleOutline} color="#DF3E30" height={24} />
            &nbsp;EXPLORE
          </Button>
        </Tooltip>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen2}
          videoId="_mhWwh1Y3vQ"
          onClose={() => setOpen2(false)}
        />
        <Tooltip title="Learn about why TRADESIMP started and what problems it solves.">
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={() => setOpen2(true)}
          >
            <Icon icon={personDoneOutline} color="#1877F2" height={24} />
            &nbsp;MY STORY
          </Button>
        </Tooltip>

        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen3}
          videoId="XvoV_cPJ08s"
          onClose={() => setOpen3(false)}
        />
        <Tooltip title="Basic TRADESIMP tutorials.  Learn how to login to the system and use it.">
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={() => setOpen3(true)}
          >
            <Icon icon={playCircleOutline} color="#1C9CEA" height={24} />
            &nbsp;START
          </Button>
        </Tooltip>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} />
      </Divider>
    </>
  );
}
