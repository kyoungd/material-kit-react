import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Container, Typography, Divider, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Page from '../components/Page';
import SkillCardGrid from '../components/experts/SkillCardGrid';
import activeExperts from '../layouts/Experts/experts_skills.json';

export default function Expert() {
  const location = useLocation();
  const { id } = location.state;

  const expert = activeExperts.find((expert) => expert.id === id);
  return (
    <Page title="EXPERT">
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          EXPERT
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ minWidth: 160 }} mx={{ minWidth: 240 }}>
              <Avatar
                alt="Remy Sharp"
                src={expert.person.image}
                sx={{ width: 160, height: 160 }}
                mx={{ width: 240, height: 240 }}
              />
            </Grid>
            <Grid item xs={10}>
              <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {expert.person.name}
                </Typography>
                <Typography paragrah sx={{ mb: 2 }}>
                  {expert.person.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ padding: 2, width: '100%' }}>
          <Divider>SKILLS</Divider>
        </Box>
        <SkillCardGrid skills={expert.data} />
      </Container>
    </Page>
  );
}
