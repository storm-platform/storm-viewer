/*
 * This file is part of Storm Viewer.
 * Copyright (C) 2022 Storm Platform.
 *
 * Storm-Viewer is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { useState, useEffect } from "react";

import axios from "axios";

import _debounce from "lodash/debounce";

import ReactFlow from "react-flow-renderer";
import { Button, Container, Grid, Input, Segment } from "semantic-ui-react";

import "./WorkflowView.css";

export const WorkflowView = ({ apiUrl }) => {
  // States
  const [userInput, setUserInput] = useState({});
  const [workflowData, setWorkflowData] = useState({});
  const [renderWorkflow, setRenderWorkflow] = useState(false);

  // Auxiliary functions
  const debouncedInputFncFactory = (fieldName) =>
    _debounce((event, data) => {
      setUserInput({ ...userInput, [fieldName]: data.value });
    }, 1000);

  if (Object.keys(workflowData).length !== 0 && !renderWorkflow) {
    setRenderWorkflow(true);
  }

  // Hooks
  useEffect(() => {
    if (Object.keys(userInput).length === 3) {
      // naive method (Just for fun) =)

      const instance = axios.create({
        headers: {
          "x-api-key": userInput.accessToken,
        },
      });

      // Getting the workflow data and formatting it.
      const workflowUrl = `${apiUrl}/projects/${userInput.projectIdentifier}/workflows/${userInput.workflowIdentifier}`;

      instance.get(workflowUrl).then(async (res) => {
        const data = res.data;
        const graph = data.graph;

        const nodes = await Promise.all(
          Object.keys(graph.nodes).map((nodeId, index) => {
            const compendiaUrl = `${apiUrl}/projects/${userInput.projectIdentifier}/compendia/${nodeId}`;

            return instance.get(compendiaUrl).then((resNode) => ({
              id: nodeId,
              data: { label: resNode.data.metadata.title },
              position: { x: 200, y: index * 100 },
            }));
          })
        );

        const edges = graph.edges.map((edge) => ({
          id: `${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
        }));

        setWorkflowData({
          nodes: nodes,
          edges: edges,
        });
      });
    }
  }, [userInput]);

  return (
    <Container>
      <Segment>
        <Grid stackable padded centered>
          <Grid.Row>
            <Grid.Column width={5}>
              <Input
                fluid
                placeholder={"Project Identifier"}
                onChange={debouncedInputFncFactory("projectIdentifier")}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Input
                fluid
                placeholder={"Workflow Identifier"}
                onChange={debouncedInputFncFactory("workflowIdentifier")}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Input
                fluid
                placeholder={"Access token"}
                onChange={debouncedInputFncFactory("accessToken")}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Button fluid>Visualize</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className={"workflowContainer"}>
        {renderWorkflow && (
          <ReactFlow
            defaultNodes={workflowData.nodes}
            defaultEdges={workflowData.edges}
            fitView
          />
        )}
      </Segment>
    </Container>
  );
};
