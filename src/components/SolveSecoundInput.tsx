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

const createEventsTab = (taskNumber: number, letTab: string[]) => {
  let i = 0;
  const eventsTab: string[] = [];
  while (i < taskNumber) {
    eventsTab.push(letTab[i] + " ");
    i++;
  }
  return eventsTab;
};

const SolveSecoundInput = ({ taskNumber, nodeNumber }: Props) => {
  return (
    <div>
      <p>elo mordo {createEventsTab(taskNumber, letterTab)}</p>
    </div>
  );
};

export default SolveSecoundInput;
