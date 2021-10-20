import '../utils/style/css/Header.css'
// import Button from '@material-ui/core/Button';

function Header(){
    document.title = 'myTricount';
    return(
        <div className='header'>
            <h1> Tricount on my favorite blockchain </h1>
        </div>


    )
}

export default Header