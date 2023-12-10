import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoFlix from "../assets/flixbase_logo.png";
import logoFlixP from "../assets/flixbase_favicon_preto.png";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import "./navbar.css";
import { querySearchContext } from "../Context";

const drawerWidth = 240;
const navItems = [
  { title: "Home", to: "/", tag: "" },
  { title: "Popular", to: "/categoria/popular", tag: "popular" },
  { title: "+Votados", to: "/categoria/top_rated", tag: "top_rated" },
  { title: "Novidades", to: "/categoria/upcoming", tag: "upcoming" },
];

function DrawerAppBar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { query, setQuery } = React.useContext(querySearchContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h5"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <img className="logo-flix-p" src={logoFlixP} alt="" />
        Flixbase
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.to);
              }}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const location = useLocation();
  let rotas = location.pathname.split("/");
  rotas = rotas[rotas.length - 1];

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar className="typo" style={{ backgroundColor: "#000e24" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                gap: 10,
              },
              marginLeft: "40px",
              marginRight: "20px",
              fontSize: "25px",
              fontWeight: "700",
              height: 75,
              color: "#2896fc",
            }}
          >
            <img className="logo-flix" src={logoFlix} alt="" />
            <p>
              Flix<span style={{ color: "white" }}>base</span>
            </p>
          </Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              // border: "1px solid red",
              margin: "0 auto",
              alignItems: "center",
              width: "100%",
              // height: 40,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar filme..."
              inputProps={{ "aria-label": "search google maps" }}
              onFocus={() => navigate("/search")}
              value={query}
              onChange={({ target }) => setQuery(target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
                justifyContent: "space-between",
                // width: "50%",
                alignItems: "center",
                // border: "1px solid red",
                // position: "absolute",
                // width: "100%",
                // left: "70%",
                gap: "10px",
                marginRight: "40px",
                marginLeft: "2%",
              },
            }}
          >
            <div className="nav-links">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  className="links"
                  to={item.to}
                  style={{ color: rotas === item.tag && "white" }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
