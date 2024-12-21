import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { TaskData, CalculationData } from "../App";
import Select from "./Select";

interface Props {
  taskNumber: number;
  nodeNumber: number;
  tabGlobal: CalculationData[];
  setResultVis: Dispatch<SetStateAction<boolean>>;
  setCalcVisabl: Dispatch<SetStateAction<boolean>>;
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

const createEventsTab = (taskNumber: number, letTab: string[]) => {
  let i = 0;
  const taskTab: string[] = [];
  while (i < taskNumber) {
    taskTab.push(letTab[i] + " ");
    i++;
  }
  return taskTab;
};

const SolveSecoundInput = ({
  taskNumber,
  nodeNumber,
  tabGlobal,
  setResultVis,
  setCalcVisabl,
}: Props) => {
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
    else {
      calculateData(colData, nodeNumber);
      setResultVis(true);
      setCalcVisabl(false);
    }
  };

  //calculationg

  const calculateData = (colData: TaskData[], nodeNumber: number) => {
    colData.forEach((elem) => {
      tabGlobal.push({
        root: {
          task: elem.task,
          duration: elem.duration,
          taskFrom: elem.taskFrom,
          taskTo: elem.taskTo,
        },
        ES: 0,
        EF: 0,
        LS: 0,
        LF: 0,
        reserve: 0,
        isCritical: false,
      });
    });

    let maxDuration = 0;

    // Krok w przód (ES i EF)
    tabGlobal.forEach((elem) => {
      tabGlobal.forEach((node) => {
        if (node.root.taskTo === elem.root.taskFrom) {
          if (node.EF > elem.ES) elem.ES = node.EF;
        }
      });
      elem.EF = elem.ES + elem.root.duration;
      if (elem.EF > maxDuration) maxDuration = elem.EF;
    });

    // Krok w tył (LS i LF)
    tabGlobal.forEach((elem) => {
      if (elem.root.taskTo === nodeNumber) {
        elem.LF = maxDuration; // LF dla ostatniego zadania
      }
    });

    for (let i = tabGlobal.length - 1; i >= 0; i--) {
      const elem = tabGlobal[i];
      tabGlobal.forEach((node) => {
        if (node.root.taskFrom === elem.root.taskTo) {
          elem.LF = elem.LF === 0 ? node.LS : Math.min(elem.LF, node.LS);
        }
      });
      elem.LS = elem.LF - elem.root.duration;
    }

    // Rezerwa i krytyczność
    tabGlobal.forEach((elem) => {
      elem.reserve = elem.LS - elem.ES;
      elem.isCritical = elem.reserve === 0;
    });
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
      <hr />
      <div className="pt-1">
        <a href="#result">
          <Button color="secondary" onClick={handleEnterData}>
            Przejdź do wyników
          </Button>{" "}
        </a>
      </div>
    </div>
  );
};

export default SolveSecoundInput;
