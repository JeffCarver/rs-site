import React, { useState, useEffect } from "react";
import { AuthContext } from "../components/Auth";
import Layout from "../components/Layout";
import { Box } from "@chakra-ui/core";
import MyRequestedRides from "../components/MyRequestedRides";
import MyOfferedRides from "../components/MyOfferedRides";
import firebase from "firebase/app";

function Home() {
  const { currentUser } = React.useContext(AuthContext);
  const [myRequestList, setMyRequestList] = useState([]);
  const [myOfferedList, setMyOfferedList] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("requests")
      .where("userId", "==", currentUser.uid)
      .get()
      .then(response => {
        const tempRequestList = [];
        const userIds = [];

        response.forEach(function(doc, i) {
          const {
            date,
            fromCity,
            fromState,
            fromStreet,
            fromZipCode,
            toCity,
            toState,
            toZipCode,
            toFacility,
            toStreet,
            userId
          } = doc.data();

          tempRequestList.push({
            pickupInfo: {
              fromCity: fromCity,
              fromState: fromState,
              fromStreet: fromStreet,
              fromZipCode: fromZipCode
            },
            dropOffInfo: {
              toCity: toCity,
              toState: toState,
              toZipCode: toZipCode,
              toFacility: toFacility,
              toStreet: toStreet
            },
            date: date,
            requestingUser: userId,
            requestID: doc.id
          });
          userIds.push(userId);
        });

        if (userIds.length) {
          fetchUsers(userIds).then(userArray => {
            tempRequestList.map(tempRequest => {
              tempRequest.user = userArray.find(
                user => user.id === tempRequest.requestingUser
              );
              return tempRequest;
            });
            setMyRequestList(tempRequestList);
          });
        }
      });
  });

  function fetchUsers(userIds) {
    return firebase
      .firestore()
      .collection("users")
      .where("id", "in", userIds)
      .get()
      .then(response => {
        const userArray = [];

        response.forEach(s => {
          userArray.push(s.data());
        });
        return userArray;
      });
  }

  return (
    <Layout>
      <Box display="flex" alignItems="flex-start" justifyItems="space-between">
        <Box p={10}>
          <MyRequestedRides requestList={myRequestList} />
        </Box>
        <Box p={10}>
          <MyOfferedRides offeredList={myOfferedList} />
        </Box>
      </Box>
    </Layout>
  );
}

export default Home;
