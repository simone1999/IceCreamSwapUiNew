import React from "react";
import styled from "styled-components";
import EXTERNAL_LINK_PROPS from "../../util/externalLinkProps";
import Text from "../Text/Text";
import { LinkProps } from "./types";
import NextLink from "next/link";

const StyledLink = styled(Text)<LinkProps>`
  align-items: center;
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
`;

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({ external, ...props }) => {
  const { href, ...rest } = props;
  const internalProps = external ? EXTERNAL_LINK_PROPS : {};
  if (!href) return <StyledLink as="a" bold {...(rest as LinkProps)} />;
  return (
    <NextLink prefetch={false} href={href} legacyBehavior passHref {...internalProps}>
      <StyledLink as="a" bold {...(rest as LinkProps)} />
    </NextLink>
  );
};

/* eslint-disable react/default-props-match-prop-types */
Link.defaultProps = {
  color: "primary",
  display: "flex",
};

export default Link;
