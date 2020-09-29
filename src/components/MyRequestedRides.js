import React from "react";
import MyRequestCard from "../components/MyRequestCard";
import { Box, Text } from "@chakra-ui/core";

function MyRequestedRides({ requestList }) {
    if (requestList.length === 0) {
        return (
            <Box>
                <Text>
                    No Requested Rides
                </Text>
            </Box>
        );
    }
  return (
    <Box>
      <Text>Requests:</Text>
      <Box>
        {requestList.map(request => (
          <MyRequestCard
            fromCity={request.pickupInfo.fromCity}
            fromState={request.pickupInfo.fromState}
            fromZipCode={request.pickupInfo.fromZipCode}
            fromFacility={request.pickupInfo.fromFacility}
            fromStreet={request.pickupInfo.fromStreet}
            toCity={request.dropOffInfo.toCity}
            toState={request.dropOffInfo.toState}
            toZipCode={request.dropOffInfo.toZipCode}
            toFacility={request.dropOffInfo.toFacility}
            toStreet={request.dropOffInfo.toStreet}
            firstName={request.user.firstName}
            lastName={request.user.lastName}
            date={request.date}
            requestID={request.requestID}
            key={request.requestID}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MyRequestedRides;
