import styled from "styled-components";

export const SubnavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 20px;
  overflow-x: auto;
`;

export const SubnavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--bs-border-color);
  width: 100%;
`;

export const SubnavLink = styled.li`
  display: flex;

  a {
    opacity: 0.5;
    padding: 10px 20px;
    text-decoration: none;
    border-bottom: 1px solid #fff;
    color: var(--bs-body-color);
  }

  a:hover {
    background-color: #eee;
  }

  a.active {
    opacity: 1.0;
    border-bottom: 1px solid #9DCB4B;
  }
`;