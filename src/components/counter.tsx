import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Heading, Text } from "./typography";
import { dumpsByTypesStates } from "./sortByTypes";

const CounterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
`;
const CounterBLocks = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const CounterBlock = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  @media (max-width: 900px) {
    width: 45%;
    margin-bottom: 30px;
  }
  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const Counter: React.FC = () => {
  const [counters, setCounters] = useState({});
  useEffect(() => {
    axios.get("/api/dumps.php")
    .then((res) => {
      setCounters(res.data);
    });
  }, []);
  return (
    <CounterWrapper>
      <Heading margin="0 0 40px 0">Обнаружено:</Heading>
      <CounterBLocks>
        {Object.entries(dumpsByTypesStates(counters)).map(
          ([key, value], i:number) => {
            return (
              <CounterBlock key={i}>
                <Heading>{value}</Heading>
                <Text fontSize="24px" textAlign="center">
                  {key}
                </Text>
              </CounterBlock>
            );
          }
        )}
      </CounterBLocks>
    </CounterWrapper>
  );
};
export default Counter;
