import React from 'react'; // , {useState }
import { Container, TextField, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { dataFetch, dataPut } from '../utils/dataFetch';

UserSettings.propTypes = {
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

function UserSettings({ url, token }) {
  const [discordId, setDiscordId] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');

  const putUrl = `${url}/:0`;
  const { data, error } = useSWR([url, token], dataFetch);
  if (error) return <div> ERROR </div>;
  if (data) {
    return (
      <Container>
        <Grid container spacing={3} justifyContent="space-around">
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">User Settings</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Discord ID"
              name="discord"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onLoad={() => setDiscordId(data.data.attributes.discordId)}
              defaultValue={data.data.attributes.discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              onBlur={() => dataPut(putUrl, token, { discordId })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Display Name"
              name="name"
              variant="outlined"
              required
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onLoad={() => setDisplayName(data.data.attributes.name)}
              defaultValue={data.data.attributes.name}
              onChange={(e) => setDisplayName(e.target.value)}
              onBlur={() => dataPut(putUrl, token, { name: displayName })}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
  return null;
}

export default UserSettings;
