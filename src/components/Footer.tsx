import '../style/Footer.css'
import IconButton from "@material-ui/core/IconButton";
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import github from '../assets/github_logo.svg'

function Footer(){
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

        </footer>
    )
}

export default Footer
