import styled from "styled-components";

export const Main = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
export const TitleHead = styled.h1`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  margin: 0.5rem;
`;
export const LogoutButton = styled.button`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  margin: 0.5rem;
  font-size: 1rem;
`;
export const Toggle = styled.p`
  cursor: pointer;
  // position: absolute;
  // top: 5px;
  // right: 60px;
  padding: 5px;
  margin-top: 0.5rem;
  border: none;

  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }
`;

export const ChartContainer = styled.div`
  color: ${(props) => props.theme.color};
`;

export const FilterBox = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-left: 25vw;
  transition: all 0.5s ease;
`;
export const MessageContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;
export const LineChartContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;
