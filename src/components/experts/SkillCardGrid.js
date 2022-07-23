import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
// import ShopProductCard from './ProductCard';
import SkillCard from './SkillCard';

// ----------------------------------------------------------------------

SkillCardGrid.propTypes = {
  skills: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired
};

export default function SkillCardGrid({ skills, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {skills.map((skill) => (
        <Grid key={skill.title} item xs={12} sm={8} md={4}>
          {/* <ShopProductCard skill={skill} /> */}
          <SkillCard {...skill} />
          {/* <SkillCard
            title={skill.title}
            subtitle={skill.subtitle}
            summary={skill.summary}
            description={skill.description}
            image={skill.image}
          /> */}
        </Grid>
      ))}
    </Grid>
  );
}
