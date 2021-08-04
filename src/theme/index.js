import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0020b1',
        },
        secondary: {
            main: '#FF7A00',
            dark: '#DE6B00',
            contrastText: "#fff"
        }
    }
});

export default theme;