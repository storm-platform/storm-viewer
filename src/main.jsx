/*
 * This file is part of Storm Viewer.
 * Copyright (C) 2022 Storm Platform.
 *
 * Storm-Viewer is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import ReactDOM from "react-dom/client";

import "semantic-ui-css/semantic.min.css";

import { Container } from "semantic-ui-react";

import "./main.css";
import { WorkflowView } from "./WorkflowView.jsx";
import { WorkflowHeader } from "./WorkflowHeader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Container>
    <WorkflowHeader />
    <div className={"viewer-app-container"}>
      <WorkflowView
        apiUrl={import.meta.env.VITE_API_ADDRESS}
        apiKey={import.meta.env.VITE_API_KEY}
      />
    </div>
  </Container>
);
