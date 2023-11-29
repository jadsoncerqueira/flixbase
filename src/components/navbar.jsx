// import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
// import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

// export default function NavBar() {
//   const location = useLocation();
//   let rotas = location.pathname.split("/"); rotas = rotas[rotas.length - 1];
//   console.log(rotas === "");
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar sx={{ backgroundColor: "#011026" }}>
//         <Toolbar className="toolbar">
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{
//               display: {
//                 xs: "none",
//                 sm: "block",
//                 color: "#2896fc",
//                 fontSize: "50px",
//                 fontWeight: "700",
//               },
//             }}
//           >
//             Flix<span style={{ color: "white" }}>base</span>
//           </Typography>
//           <div className="nav-links">
//             <Link
//               className="links"
//               to="/"
//               style={{ color: rotas === "" && "white" }}
//             >
//               Home
//             </Link>
//             <Link
//               className="links"
//               to="/categoria/popular"
//               style={{ color: rotas === "popular" && "white" }}
//             >
//               Popular
//             </Link>
//             <Link className="links" to="/categoria/top_rated" style={{ color: rotas === "top_rated" && "white" }}></Link>
//             <Link
//               className="links"
//               to="/categoria/upcoming"
//               style={{ color: rotas === "upcoming" && "white" }}
//             >
//               Por vir
//             </Link>
//           </div>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ "aria-label": "search" }}
//             />
//           </Search>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

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

const drawerWidth = 240;
const navItems = [
  { title: "Home", to: "/", tag: "" },
  { title: "Popular", to: "/categoria/popular", tag: "popular" },
  { title: "Mais Votados", to: "/categoria/top_rated", tag: "top_rated" },
  { title: "Por vir", to: "/categoria/upcoming", tag: "upcoming" },
];

function DrawerAppBar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
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
        <Toolbar style={{ backgroundColor: "#000e24" }}>
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
              display: { xs: "none", sm: "block" },
              marginLeft: "40px",
              fontSize: "30px",
              fontWeight: "700",
              color: "#2896fc",
            }}
          >
            Flix<span style={{ color: "white" }}>base</span>
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
                // border: "1px solid red",
                position: "absolute",
                width: "310px",
                left: "70%",
                transform: "translate(-50%)",
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
