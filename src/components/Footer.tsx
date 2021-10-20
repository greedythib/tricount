import {useContext} from "react";
import {ThemeContext} from "../utils/context/theme-context";
import '../utils/style/css/Footer.css'
import IconButton from "@material-ui/core/IconButton";
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import github from '../assets/github_logo.svg'

function Footer(){
    const {isDark, toggleButton} = useContext(ThemeContext);
    return(
        <footer className='footer-div'>
            <Divider variant = 'middle'/>

            <Stack direction="row" spacing={2} justifyContent = 'center' mt = {2}>
                <IconButton href='https://github.com/greedythib'>
                    <Avatar alt="Github" src={github} />
                </IconButton>
                {/*<IconButton href = 'https://twitter.com/greedythib'>*/}
                {/*    <Avatar alt="Travis Howard" src={twitter} />*/}
                {/*</IconButton>*/}
            </Stack>

            {/*<button> Set to dark mode? </button>*/}

        </footer>
    )
}

export default Footer
