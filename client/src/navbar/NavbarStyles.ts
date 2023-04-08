import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 1rem;
  background-color: var(--theme-primary);
  color: var(--theme-background);

  a {
    color: var(--theme-background);
    text-decoration: none;

    &:hover {
      color: var(--bs-white);
    }
  }
`;

export const NavTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  color: var(--theme-background);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;

  span {
    display: block;
    white-space: nowrap;
  }

  img {
    max-width: 44px;
    height: auto;
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavLink = styled.li`
  margin: 0 1rem;
`;