import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import arrowDown from '@iconify/icons-eva/arrow-circle-down-outline';
// import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
import { Box, Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material';
import { getRealtimes, getSymbols, useUserDispatch } from '../../UserContext';
import Cookie from '../../../utils/cookies';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: '100%', boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDownloadCallback: PropTypes.func,
  pageType: PropTypes.string
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  onDownloadCallback,
  pageType
}) {
  const userDispatch = useUserDispatch();
  const token = Cookie.token();
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.white'
        })
      }}
    >
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Search assets..."
        startAdornment={
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
      />
      {/* {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search assets..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )} */}

      <Tooltip title="Download New Data">
        <IconButton
          onClick={() => {
            if (pageType === 'REALTIME')
              getRealtimes(userDispatch, token, null, null, onDownloadCallback);
            if (pageType === 'DAILY')
              getSymbols(userDispatch, token, null, null, onDownloadCallback);
          }}
        >
          <Icon icon={arrowDown} />
        </IconButton>
      </Tooltip>
    </RootStyle>
  );
}
