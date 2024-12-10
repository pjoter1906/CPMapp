import React, { useRef, useEffect } from "react";
import cytoscape from "cytoscape";

type NodeInfo = {
  id: number;
  ES: number;
  EF: number;
  slack: number;
};

function createNodeInfo(id: number, ES: number, EF: number): NodeInfo {
  return {
    id,
    ES,
    EF,
    slack: EF - ES, // Automatyczne obliczenie slack
  };
}

let nodeInfo: NodeInfo = createNodeInfo(1, 0, 5);

const nodeList: NodeInfo[] = [];
let lecimy: boolean = true;
let i = 1;
while (lecimy) {
  i < 5 ? nodeList.push(createNodeInfo(i, i + 1, i * 4)) : (lecimy = false);
  console.log(i);
  i++;
}

let obiekt = { data: { id: "1", label: "eloo" } };

const tab: { data: { id: string; label: string } }[] = [obiekt, obiekt];

type Elem = {
  data: { id?: string; label?: string; source?: string; target?: string };
};

const tab2: Elem[] = nodeList.map((node) => ({
  data: {
    id: node.id.toString(),
    label: node.id.toString() + "\n" + node.slack.toString() + "\nelo mordooo",
  },
}));

tab2.push({ data: { source: "1", target: "2" } });

const CPMGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cy = cytoscape({
        container: containerRef.current,
        elements: [
          //tab2[0],
          {
            data: {
              id: "1",
              label: "node: 1\nES: 3\nEF: 6\nSlack: 1",
              isCritical: "true",
            },
          },
          {
            data: {
              id: "2",
              label: "node: 2\nES: 3\nEF: 6\nSlack: 1",
              isCritical: "true",
            },
          },
          { data: { id: "3", label: "node: 3\nES: 6\nEF: 10\nSlack: 0" } },
          {
            data: {
              id: "4",
              label: "node: 4\nES: 0\nEF: 3\nSlack: 0",
              isCritical: "true",
            },
          },
          {
            data: {
              id: "5",
              label: "node: 5\nES: 3\nEF: 6\nSlack: 1",
              isCritical: "true",
            },
          },
          {
            data: {
              source: "1",
              target: "2",
              label: "Critical Path",
              iscritic: "A4",
            },
          },
          { data: { source: "2", target: "3" } },
          { data: { source: "1", target: "3" } },
          { data: { source: "2", target: "4", label: "Critical Path" } },
          { data: { source: "4", target: "5", label: "Critical Path" } },
          { data: { source: "3", target: "5" } },
          { data: { source: "1", target: "5" } },
        ],
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#0074D9",
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              color: "#fff",
              "font-size": "12px",
              width: "label",
              height: "label",
              shape: "rectangle",
              "text-wrap": "wrap",
              "text-max-width": "100",
              "padding-top": "6px",
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#A9A9A9",
              "target-arrow-color": "#A9A9A9",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
          {
            selector: 'node[isCritical="true"]',
            style: {
              "background-color": "#FF4136",
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              color: "#fff",
              "font-size": "12px",
              width: "label",
              height: "label",
              shape: "rectangle",
              "text-wrap": "wrap",
              "text-max-width": "100",
            },
          },
          {
            selector: 'edge[label="Critical Path"]',
            style: {
              label: "data(iscritic)",
              "text-valign": "center",
              "text-halign": "center",
              "line-color": "#FF4136",
              "target-arrow-color": "#FF4136",
              width: 4,
              "text-margin-y": -20,
            },
          },
        ],
        layout: {
          name: "breadthfirst",
          directed: true,
          padding: 10,
          spacingFactor: 1.5,
        },
      });

      return () => cy.destroy();
    }
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
};

export default CPMGraph;
