import * as React from 'react';
import { Box, Container, Typography, Divider, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import SkillCardGrid from '../components/experts/SkillCardGrid';

Favorites.propTypes = {
  favorites: PropTypes.object.isRequired,
  userDispatch: PropTypes.func.isRequired
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

export default function Favorites() {
  const activeExperts = [
    { id: 1, person: {}, data: [] },
    {
      id: 2,
      person: {
        name: 'Young Kwon',
        summary: 'Day-trading with numbers',
        description:
          'A hybrid trading system combines the objective rules of an AI with the discretionary decisions of a trader which are based on the dominant themes of the market, current risk sentiment, price action and recent economic news.',
        image: '/static/mock-images/avatars/ykphoto.jpeg'
      },
      data: [
        {
          title: 'Shrimp and Chorizo Paella',
          subtitle: 'September 14, 2016',
          summary:
            'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
          description:
            'Method:\n Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.\n Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.\n Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don&apos;t open.)\n Set aside off of the heat to let rest for 10 minutes, and then serve.',
          image: '/static/mock-images/products/product_1.jpg',
          video: 'wPXVR2LYovU'
        },
        {
          title: 'Shrimp and Chorizo Paella',
          subtitle: 'September 14, 2016',
          summary:
            'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
          description:
            'Method:\n Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.\n Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.\n Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don&apos;t open.)\n Set aside off of the heat to let rest for 10 minutes, and then serve.',
          image: '/static/mock-images/products/product_1.jpg',
          video: 'wPXVR2LYovU'
        },
        {
          title: 'Shrimp and Chorizo Paella',
          subtitle: 'September 14, 2016',
          summary:
            'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
          description:
            'Method:\n Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.\n Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.\n Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don&apos;t open.)\n Set aside off of the heat to let rest for 10 minutes, and then serve.',
          image: '/static/mock-images/products/product_1.jpg',
          video: 'wPXVR2LYovU'
        },
        {
          title: 'Shrimp and Chorizo Paella',
          subtitle: 'September 14, 2016',
          summary:
            'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
          description:
            'Method:\n Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.\n Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.\n Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don&apos;t open.)\n Set aside off of the heat to let rest for 10 minutes, and then serve.',
          image: '/static/mock-images/products/product_1.jpg',
          video: 'wPXVR2LYovU'
        }
      ]
    },
    { id: 3, person: {}, data: [] }
  ];
  const id = 2;
  const expert = activeExperts.find((expert) => expert.id === id);
  return (
    <Page title="FAVORITES">
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Favorites
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 }
                }}
                alt="The house from the offer."
                src={expert.person.image}
              />
            </Grid>
            <Grid item xs={8}>
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
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Container>
    </Page>
  );
}
