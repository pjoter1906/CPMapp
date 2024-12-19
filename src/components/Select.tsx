interface Props {
  nodesNumber: number;
  isFrom: boolean;
}

let selectId = 0;

const numberTabGenerate = (num: number) => {
  let i = 0;
  const numberTab: number[] = [];
  while (i < num) {
    numberTab.push(i + 1);
    i++;
  }
  return numberTab;
};

const optionGenerate = (num: number) =>
  numberTabGenerate(num).map((elem) => (
    <option key={elem.toString()} value={elem.toString()}>
      {elem.toString()}
    </option>
  ));

const Select = ({ nodesNumber, isFrom }: Props) => {
  selectId += 1;
  return (
    <select
      className="form-select"
      id={"select-" + selectId.toString()}
      defaultValue=""
    >
      <option value="" disabled>
        {!isFrom ? "Zdarzenie kończące" : "Zdarzenie początkowe"}
      </option>
      {optionGenerate(nodesNumber)}
    </select>
  );
};

export default Select;
