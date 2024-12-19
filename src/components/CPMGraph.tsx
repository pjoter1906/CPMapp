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
      //label: "elo mordooo",
      label: `${elem.root.task} ${elem.root.duration}\nES: ${elem.ES} | EF: ${elem.EF}\nLS: ${elem.LS} | LF: ${elem.LF}\nrezerwa: ${elem.reserve}`,
      isCritical: elem.isCritical.toString(),
    },
  }));

  const combinedArray = [...graphNode, ...graphTask];
  console.log(graphNode);
  useEffect(() => {
    if (containerRef.current) {
      const cy = cytoscape({
        container: containerRef.current,
        elements: combinedArray,
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#0074D9",
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              color: "#fff",
              "font-size": "16px",
              width: "label",
              height: "label",
              shape: "octagon",
              "text-wrap": "wrap",
              "text-max-width": "100",
              "padding-top": "6px",
            },
          },
          {
            selector: "edge",
            style: {
              label: "data(label)", // Pobiera wartość z pola `label`
              "text-wrap": "wrap", // Zawijanie tekstu
              "text-valign": "center", // Wyrównanie tekstu w pionie
              "text-halign": "center", // Wyrównanie tekstu w poziomie
              "text-max-width": "200px", // Maksymalna szerokość zawiniętego tekstu
              "font-size": "10px", // Dostosowanie rozmiaru czcionki
              "line-color": "#A9A9A9",
              "target-arrow-color": "#A9A9A9",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
              "text-outline-color": "#ffffff", // Obramowanie tekstu dla czytelności
              "text-outline-width": 2, // Szerokość obramowania
              color: "#333333", // Kolor tekstu
              "font-family": "Arial, sans-serif", // Styl czcionki
              "line-height": 1.2,
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
              width: "label",
              height: "label",
              shape: "octagon",
              "text-wrap": "wrap",
              "text-max-width": "100",
            },
          },
          {
            selector: 'edge[isCritical="true"]',
            style: {
              label: "data(label)",
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

  return <div ref={containerRef} style={{ width: "100%", height: "600px" }} />;
};

export default CPMGraph;
