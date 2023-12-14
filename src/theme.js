import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  overrides: {
    MuiInputBase: {
      input: {
        fontSize: '14px',
        color: '#7D7D7D',
        fontFamily: 'Lato',       
        fontWeight: '400',
        textAlign: 'center'
      },
    },
  },
});

export default theme;
