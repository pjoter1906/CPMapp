import { useState, useEffect } from "react";

interface Props {
  inputRefTask?: React.RefObject<HTMLInputElement>;
  inputRefNode?: React.RefObject<HTMLInputElement>;
  children: string;
  isError: boolean;
}

let inputId = 0;

const SolveFirstInput = ({
  inputRefTask,
  inputRefNode,
  children,
  isError,
}: Props) => {
  inputId += 1;
  const [cellHide, setCellHide] = useState("d-none");
  useEffect(() => {
    if (isError) {
      setCellHide("");
    } else {
      setCellHide("d-none");
    }
  }, [isError]);
  return (
    <div className="pb-3">
      <label id={"main-" + inputId.toString()} className={`${cellHide}`}>
        <p style={{ color: "red" }}>Podaj liczbę większą od 0</p>
      </label>
      <div className="form-floating mb-2">
        <input
          ref={inputRefTask ? inputRefTask : inputRefNode}
          type="number"
          className="form-control"
          id={"inputID-" + inputId.toString()}
          placeholder={"inputID-" + inputId.toString()}
          style={{ width: "200px", resize: "none" }}
        />
        <label
          id={"l1-" + inputId.toString()}
          htmlFor={"inputID-" + inputId.toString()}
        >
          {children}
        </label>
      </div>
    </div>
  );
};

export default SolveFirstInput;
