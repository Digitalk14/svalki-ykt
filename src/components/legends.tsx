import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import redBin from "../images/red_bin.png";
import greenBin from "../images/green_bin.png";
import question from "../images/question.png";
import picnic from "../images/picnic.png";
import { Text } from "./typography";
import { dumpsByTypesStates } from "./sortByTypes";
import { Statuses } from "./statuses/statuses";

const LegendBlocks = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  box-sizing: border-box;
  padding: 0 20px;
`;
const LegendsBlock = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 700px) {
    width: 100%;
  }
`;
const LegendImage = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 25px;
  height: 25px;
  margin: 0 20px 0 0;
`;

export const Legends: React.FC = () => {
  const [legends, setLegends] = useState({});
  useEffect(() => {
    axios.get("/api/dumps.php").then((res) => {
      setLegends(res.data);
    });
  }, []);
  return (
    <LegendBlocks>
      {Object.entries(dumpsByTypesStates(legends)).map(([keys, block], i) => {
        switch (keys) {
          case Statuses[0]:
            return (
              <LegendsBlock key={i}>
                <LegendImage src={redBin} />
                <Text>{keys}</Text>
              </LegendsBlock>
            );
          case Statuses[3]:
            return (
              <LegendsBlock key={i}>
                <LegendImage src={greenBin} />
                <Text>{keys}</Text>
              </LegendsBlock>
            );
          case Statuses[2]:
            return (
              <LegendsBlock key={i}>
                <LegendImage src={question} />
                <Text>{keys}</Text>
              </LegendsBlock>
            );
          case Statuses[1]:
            return (
              <LegendsBlock key={i}>
                <LegendImage src={picnic} />
                <Text>{keys}</Text>
              </LegendsBlock>
            );
        }
      })}
    </LegendBlocks>
  );
};
