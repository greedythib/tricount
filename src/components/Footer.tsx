import { useContext } from "react";
import { ThemeContext } from "../utils/context/theme-context";
import "../utils/style/css/Footer.css";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import github from "../assets/github_logo.svg";
import Switch from "@mui/material/Switch";

function Footer() {
  const { isDark, toggleButton } = useContext(ThemeContext);
  return (
    <footer className="footer-div">
      {/*<p style={{ textAlign: "center" }}>*/}
      {/*  is Dark? : {isDark ? <span>yes</span> : <span>no</span>}*/}
      {/*</p>*/}
      <Divider variant="middle" />

      {/*<Stack direction="row" spacing={2} justifyContent="center" mt={2}>*/}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignContent="center"
      >
        {/*<Switch sx={{ visibility: "hidden" }} />*/}
        <IconButton href="https://github.com/greedythib">
          <Avatar alt="Github" src={github} />
        </IconButton>
        <Stack paddingTop="10px">
          <Switch onClick={toggleButton} />
        </Stack>
      </Stack>
      {/*<Stack direction="row" justifyContent="right">*/}

      {/*</Stack>*/}
    </footer>
  );
}

export default Footer;
