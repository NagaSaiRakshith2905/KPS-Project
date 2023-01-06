import { LogoutRounded, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box bgcolor={"#222831"}>
      <Stack
        direction={"row"}
        width={"100%"}
        height={"8vh"}
        paddingY={"1rem"}
        paddingX={"2rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5" align={"center"} sx={{ cursor: "pointer" }}>
          K-Path Simulations.
        </Typography>

        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {username}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={(e) => navigate(`/profile/${username}`)}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              localStorage.removeItem("username");
              dispatch(authActions.setUsername(""));
              dispatch(authActions.setloggedin(false));
              navigate("/signup");
            }}
          >
            <ListItemIcon>
              <LogoutRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default Navbar;
