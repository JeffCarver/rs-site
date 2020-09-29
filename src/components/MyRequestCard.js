import React, { useContext } from "react";
import { AuthContext } from "../components/Auth";
import { Box, Text, Button } from "@chakra-ui/core";

function MyRequestCard(props) {
  const { currentUser } = useContext(AuthContext);

  function toUber(fromStreet, fromCity, fromState, fromZip, toStreet, toCity, toState, toZip) {
    console.log("To ", fromStreet, fromCity, fromState, fromZip);
    var test = "https://www.uber.com/us/en/ride/";
    var win = window.open(test, '_blank');
    win.focus();
  }

  function toLyft(pickup, destination) {
    console.log("To lyft");
    var test = "https://lyft.com/ride?id=lyft&partner=0nxgd3SSPr95&destination=-122.4242038&pickup=-122.422999"
    var win = window.open(test, '_blank');
    win.focus();
}
 
  return (
    <Box
      mb={4}
      w="400px"
      h="100%"
      border="2px"
      borderColor="gray.200"
      borderRadius="10"
    >
      <Box mb={2} ml={2}>
        <Text p={1 / 2} as="em" fontWeight="bold">
          Pickup Location
        </Text>
        <Text p={1 / 2} isTruncated>
          {props.fromStreet}
        </Text>
        <Text p={1 / 2} isTruncated>
          {props.fromCity}, {props.fromState} {props.fromZipCode}
        </Text>
      </Box>

      <Box mb={2} ml={2}>
        <Text p={1 / 2} as="em" fontWeight="bold">
          Destination
        </Text>
        <br/>
        <Text p={1 / 2} as="em">
          {props.toFacility}
        </Text>
        <Text p={1 / 2} isTruncated>
          {props.toStreet}
        </Text>
        <Text p={1 / 2} isTruncated>
          {props.toCity}, {props.toState} {props.toZipCode}
        </Text>
      </Box>

      <Text p={1 / 2} as="em" fontWeight="bold">
          Ride Apps
        </Text>
      <Box display="flex" alignItems="center" flex={1} flexDirection='row' justifyContent='space-around'>
        <Box mb={2} ml={2} alignContent='center'>
            {/* <Link to="/ride/make-offer"> */}
            <Button
            flex={1}
            type="button"
            p={1 / 2}
            variantColor="green"
            onClick={() => toUber(props.fromStreet, props.fromCity, props.fromState, props.fromZipCode,
                props.toStreet, props.toCity, props.toState, props.toZipCode)}
            >
            <Text p={1 / 2} m={1}>
                Uber
            </Text>
            </Button>
            {/* </Link> */}
        </Box>

        <Box mb={2} ml={2} alignContent='center'>
            {/* <Link to="/ride/make-offer"> */}
            <Button
            flex-grow={1}
            type="button"
            p={1 / 2}
            variantColor="pink"
            onClick={() => toLyft(props.requestID, currentUser)}
            >
            <Text p={1 / 2} m={1}>
                Lyft
            </Text>
            </Button>
            {/* </Link> */}
            </Box>
        </Box>

        <Box mb={2} ml={2}>
        <Text p={1 / 2} as="em" fontWeight="bold">
          Facility Shuttle Number
        </Text>
        <br/>
        <Text p={1 / 2} as="em">
          Unknown Number
        </Text>
      </Box>

      <Box mb={2} ml={2}>
        <Text p={1 / 2} as="em" fontWeight="bold">
          Local Transportation Services
        </Text>
        <br/>
        <Text p={1 / 2} as="em">
          Unknown Number
        </Text>
      </Box>
    </Box>
  );
}

export default MyRequestCard;
