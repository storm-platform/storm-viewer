/*
 * This file is part of Storm Viewer.
 * Copyright (C) 2022 Storm Platform.
 *
 * Storm-Viewer is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { Container, Image, Menu } from "semantic-ui-react";

/**
 * Header for the Storm Viewer App.
 */
export const WorkflowHeader = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item
          as="a"
          header
          href={"https://github.com/storm-platform"}
          target={"_blank"}
        >
          <Image
            size="tiny"
            src="/storm-logo.png"
            style={{ marginRight: "1.5em" }}
          />
          Storm Platform
        </Menu.Item>
        <Menu.Item
          as="a"
          href={"https://github.com/storm-platform"}
          target={"_blank"}
        >
          Home
        </Menu.Item>
        <Menu.Item
          as="a"
          href={"https://github.com/storm-platform/storm-searcher"}
          target={"_blank"}
        >
          Searcher
        </Menu.Item>
        <Menu.Item
          as="a"
          href={"https://spec.storm-platform.org/"}
          target={"_blank"}
        >
          Specification
        </Menu.Item>
      </Container>
    </Menu>
  );
};
