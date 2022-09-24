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

import { WorkflowView } from "./WorkflowView.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WorkflowView apiUrl={import.meta.env.VITE_API_ADDRESS} />
);
