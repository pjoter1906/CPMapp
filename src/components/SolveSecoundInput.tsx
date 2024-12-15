import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import Button from "./Button";
import { TaskData } from "../App";
import Select from "./Select";

interface Props {
  taskNumber: number;
  nodeNumber: number;
}

const letterTab: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "R",
  "S",
  "T",
  "U",
  "W",
  "X",
  "Y",
  "Z",
];

//const [cellHide, setCellHide] = useState("d-none");

const createEventsTab = (taskNumber: number, letTab: string[]) => {
  let i = 0;
  const taskTab: string[] = [];
  while (i < taskNumber) {
    taskTab.push(letTab[i] + " ");
    i++;
  }
  return taskTab;
};

const SolveSecoundInput = ({ taskNumber, nodeNumber }: Props) => {
  const [cellHide, setCellHide] = useState("d-none");

  const createInputTable = (
    taskTab: string[],
    rowRefs: React.RefObject<HTMLTableRowElement>[],
    nodeNumber: number
  ) => {
    return taskTab.map((elem, index) => (
      <tr ref={rowRefs[index]} key={elem}>
        <td className="text-center">{elem}</td>
        <td>
          <input
            type="number"
            className="form-control"
            style={{ width: "200px", resize: "none" }}
          />
        </td>
        <td>
          <Select nodesNumber={nodeNumber} isFrom={true} />
        </td>
        <td>
          <Select nodesNumber={nodeNumber} isFrom={false} />
        </td>
        <td className={`${cellHide}`}>
          <p>Elo mordo</p>
        </td>
      </tr>
    ));
  };

  const rowRefs = useRef<React.RefObject<HTMLTableRowElement>[]>(
    Array(taskNumber)
      .fill(null)
      .map(() => React.createRef<HTMLTableRowElement>())
  );

  const checkData = (
    inputVal: number,
    sel1Val: number,
    sel2Val: number,
    relationTab: string[]
  ) => {
    const alerTab: [{ isTrue: Boolean; alert: String }] = [
      { isTrue: true, alert: "" },
    ];
    let relation: string = sel1Val.toString() + sel2Val.toString();
    // Check input value
    if (inputVal <= 0)
      alerTab.push({
        isTrue: false,
        alert: "- Czas trwania czynności musi być większy od 0<br />",
      });
    if (relationTab.some((num) => num === relation))
      alerTab.push({
        isTrue: false,
        alert: "- Powtórzona relacja między zdarzeniami<br />",
      });

    if (sel1Val === sel2Val && sel1Val !== 0 && sel2Val !== 0)
      alerTab.push({
        isTrue: false,
        alert: "- Połaczono te same zdarzenia<br />",
      });
    if (sel1Val === 0)
      alerTab.push({
        isTrue: false,
        alert: "- Wybierz zdarzenie początkowe<br />",
      });
    if (sel2Val === 0)
      alerTab.push({
        isTrue: false,
        alert: "- Wybierz zdarzenie kończące<br />",
      });

    return alerTab;
  };

  const colData: TaskData[] = [];
  const handleEnterData = () => {
    setCellHide("d-none");
    let isError = false;
    colData.length = 0;
    const relationTab: string[] = [];
    for (const [index, ref] of rowRefs.current.entries()) {
      if (ref.current) {
        const taskValue = ref.current.firstChild?.textContent;
        const inputValue = ref.current.querySelector("input")?.value;
        const selectValues = ref.current.querySelectorAll("select");
        const select1Value = selectValues[0]?.value;
        const select2Value = selectValues[1]?.value;
        const pElement = ref.current.querySelector("p");
        if (pElement) pElement.innerText = "";
        const alertTab = checkData(
          Number(inputValue),
          Number(select1Value),
          Number(select2Value),
          relationTab
        );
        alertTab.forEach((elem) => {
          if (!elem.isTrue) {
            setCellHide("");
            isError = true;
            if (pElement) {
              pElement.innerHTML += elem.alert; // Bezpieczne przypisanie
            }
          }
        });
        relationTab.push(select1Value + select2Value);
        colData.push({
          task: taskValue?.trim(),
          duration: Number(inputValue),
          taskFrom: Number(select1Value),
          taskTo: Number(select2Value),
        });
      }
    }
    if (isError) colData.length = 0;
    console.log(colData);
  };

  return (
    <div className="col-10">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              Czynność
            </th>
            <th className="text-center" scope="col">
              Czas trwania
            </th>
            <th className="text-center" colSpan={2}>
              Następstwo zdarzeń
            </th>
            <th
              className={`text-center ${cellHide}`}
              scope="col"
              style={{ color: "red" }}
            >
              Alert
            </th>
          </tr>
        </thead>
        <tbody>
          {createInputTable(
            createEventsTab(taskNumber, letterTab),
            rowRefs.current,
            nodeNumber
          )}
        </tbody>
      </table>
      <div className="pt-3">
        <Button onClick={handleEnterData}>Przejdź do wyników</Button>
      </div>
    </div>
  );
};

export default SolveSecoundInput;
