import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NetworkCard from "../components/home/NetworkCard";
import CreateNetwork from "../components/home/CreateNetworkDialog";
import Navbar from "../components/home/Navbar";
import { getAllNetworkAPI } from "../services/NetworkService";
import { useSelector } from "react-redux";
import AddNetworkIcon from "../images/network.svg";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  useEffect(() => {
    if (!isLoggedIn) navigate("/signup");
  }, [isLoggedIn, navigate]);

  const [cnModal, setCnModal] = useState(false);

  const handleCNOpen = () => {
    setCnModal(true);
  };

  const handleCNClose = () => {
    setCnModal(false);
  };

  const [networksList, setNetworksList] = useState([]);

  useEffect(() => {
    document.title = "KPS | Home";
    getAllNetwork();
  }, []);
  const getAllNetwork = async () => {
    await getAllNetworkAPI(username)
      .then((result) => {
        setNetworksList([]);
        setNetworksList((prev) => {
          return [...prev, ...result.data];
        });
      })
      .catch((error) => {
        if (error.message === "Network Error") alert("Can't reach server!");
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          padding: "2rem",
          width: "min(100% , 1000px)",
          marginInline: "auto",
          height: "92vh",
        }}
      >
        {cnModal && (
          <CreateNetwork
            handleOpen={handleCNOpen}
            open={cnModal}
            handleClose={handleCNClose}
          />
        )}
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          sx={{ my: "2rem" }}
        >
          <Typography variant={"body1"} color={"rgb(255 255 255/0.6)"}>
            List of all networks :
          </Typography>
          <Button
            size="small"
            variant={"outlined"}
            color={"success"}
            onClick={(e) => setCnModal((prev) => !prev)}
          >
            New Network
          </Button>
        </Stack>
        {networksList.length > 0 ? (
          networksList.map((network) => {
            return (
              <NetworkCard id={network.id} networkName={network.networkName} />
            );
          })
        ) : (
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Stack
              sx={{
                border: "1px dashed rgb(255 255 255/0.3)",
                width: "fit-content",
                py: "2rem",
                px: "3rem",
                borderRadius: "0.5rem",
              }}
              gap={1}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img src={AddNetworkIcon} width={"128px"} alt="add-network" />
              <Typography
                variant={"h4"}
                align={"center"}
                color={"rgb(255 255 255/0.87)"}
                mt={2}
              >
                No Netorks Available!
              </Typography>
              <Typography
                variant={"body1"}
                align={"center"}
                color={"rgb(255 255 255/0.6)"}
              >
                Create New Network
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
