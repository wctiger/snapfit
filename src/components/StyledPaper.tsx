import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

export default StyledPaper;
