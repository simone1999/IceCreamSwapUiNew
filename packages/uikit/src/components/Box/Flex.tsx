import styled from "styled-components";
import { flexbox, layout, position, space } from "styled-system";
import Box from "./Box";
import { FlexProps } from "./types";

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
  ${layout}
  ${position}
  ${space}
  ${({ gap }) => gap && `gap: ${gap};`}
`;

export default Flex;
