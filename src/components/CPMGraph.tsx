import React, { useRef, useEffect } from "react";
import cytoscape from "cytoscape";
import { CalculationData } from "../App";

interface Props {
  tabGlobal: CalculationData[];
  nodeNumber: number;
}

type GraphElement = {
  data: {
    id?: string;
    label: string;
    source?: string;
    target?: string;
    isCritical?: string;
  };
};

const CPMGraph: React.FC<Props> = ({ tabGlobal, nodeNumber }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphNode: GraphElement[] = [];
  const criticalNodes = tabGlobal.map((elem) => {
    if (elem.isCritical) return elem.root.taskTo;
  });

  let i: number = 0;
  while (i < nodeNumber) {
    let temp = i + 1;
    if (criticalNodes.includes(temp) || i === 0) {
      graphNode.push({
        data: {
          id: (i + 1).toString(),
          label: (i + 1).toString(),
          isCritical: "true",
        },
      });
    } else {
      graphNode.push({
        data: {
          id: (i + 1).toString(),
          label: (i + 1).toString(),
          isCritical: "false",
        },
      });
    }
    i++;
  }

  const graphTask: GraphElement[] = tabGlobal.map((elem) => ({
    data: {
      source: elem.root.taskFrom.toString(),
      target: elem.root.taskTo.toString(),
      label: `${elem.root.task} ${elem.root.duration}\nES: ${elem.ES} | EF: ${elem.EF}\nLS: ${elem.LS} | LF: ${elem.LF}\nrezerwa: ${elem.reserve}`,
      isCritical: elem.isCritical.toString(),
    },
  }));

  const combinedArray = [...graphNode, ...graphTask];
  useEffect(() => {
    if (containerRef.current) {
      const cy = cytoscape({
        container: containerRef.current,
        elements: combinedArray,
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#f0f0f0",
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              color: "#000",
              "font-size": "16px",
              shape: "octagon",
              "text-wrap": "wrap",
              "text-max-width": "100",
            },
          },
          {
            selector: "edge",
            style: {
              "text-background-shape": "rectangle", // Tło tekstu w kształcie prostokąta
              "text-background-color": "#f0f0f0", // Kolor tła
              "text-background-padding": "6px", // Wypełnienie
              "text-background-opacity": 1, // Przezroczystość tła
              label: "data(label)",
              "text-wrap": "wrap",
              "text-valign": "center",
              "text-halign": "center",
              "text-max-width": "150px",
              "font-size": "10px",
              "curve-style": "bezier", // Styl łuku
              "line-color": "#A9A9A9", // Kolor linii
              width: 3, // Grubość linii
              "target-arrow-shape": "triangle", // Kształt strzałki (trójkąt)
              "target-arrow-color": "#A9A9A9", // Kolor strzałki
              "arrow-scale": 1.5,
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
              "font-size": "16px",
              shape: "octagon",
              "text-wrap": "wrap",
              "text-max-width": "100",
            },
          },
          {
            selector: 'edge[isCritical="true"]',
            style: {
              "text-background-shape": "rectangle", // Tło tekstu w kształcie prostokąta
              "text-background-color": "#FF4136", // Kolor tła
              "text-background-padding": "6px", // Wypełnienie
              "text-background-opacity": 1, // Przezroczystość tła
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              "line-color": "#FF4136",
              "target-arrow-color": "#FF4136",
              width: 3,
              "text-margin-y": -20,
              color: "#fff",
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

  return (
    <>
      <div ref={containerRef} style={{ width: "80%", height: "600px" }} />
      <svg>
        <g>
          <rect x={60} y={40} width={20} height={20} fill="#FF4136" />
          <text x={90} y={55} fontSize="12">
            Czynność krytyczna
          </text>
        </g>
      </svg>
    </>
  );
};

export default CPMGraph;
