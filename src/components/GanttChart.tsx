import { CalculationData } from "../App";

export type Gantt = {
  id: number;
  activity: string;
  taskFrom: number;
  taskTo: number;
  es: number; // Early Start (początek)
  ef: number; // Early Finish (koniec)
  duration: number;
  reserve: number;
  isCritical: boolean;
};

interface Props {
  data: { tasks: Gantt[]; maxTime: number };
}

const GanttChart = ({ data }: Props) => {
  // const id = data.tasks[data.tasks.length - 1].id;
  const chartWidth = 900; // Szerokość wykresu
  const chartHeight =
    data.tasks.length < 5 ? data.tasks.length * 80 : data.tasks.length * 60; // Wysokość wykresu
  const marginLeft = 60; // Odstęp po lewej stronie (dla etykiety osi Y)
  const marginBottom = 40; // Odstęp na dole (dla etykiety osi X)
  const marginTop = 60; // Odstęp na górze (dla nagłówków)

  const maxTime =
    Math.max(...data.tasks.map((task) => task.ef + task.reserve)) + 1; // Dodajemy +1 na końcu osi X
  const rowHeight = 40;

  const scaleX = (chartWidth - marginLeft) / maxTime; // Skala dla osi X uwzględnia dodatkowy margines
  const scaleY = rowHeight; // Skala dla osi Y (stała dla każdego zadania)

  const sortedTasks = data.tasks.slice().reverse(); // Zadania w odwrotnej kolejności, aby A było na górze

  const getPosition = (index: number) =>
    chartHeight - (index + 1) * scaleY - 30;

  const eliminateReserve: () => number[] = () => {
    let num: number[] = [];
    for (let i = 0; i < sortedTasks.length; i++) {
      let task = sortedTasks[i];
      if (task.reserve > 0) {
        for (let j = 0; j < data.tasks.length; j++) {
          let elem = data.tasks[j];
          let check: boolean = task.taskTo === elem.taskFrom;
          if (check)
            if (task.ef === elem.es)
              if (!task.isCritical && !elem.isCritical) num.push(task.id);
        }
      }
    }
    return num;
  };

  return (
    <svg width={chartWidth} height={chartHeight + marginBottom + marginTop}>
      {/* Podpis górnej osi (zdarzenia) */}
      <text
        x={chartWidth / 2}
        y={marginTop - 30}
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
      >
        Zdarzenia
      </text>

      {/* Oś X (Dolna) */}
      <line
        x1={marginLeft}
        y1={chartHeight}
        x2={marginLeft + maxTime * scaleX}
        y2={chartHeight}
        stroke="black"
      />

      {/* Podpis dolnej osi (czas) */}
      <text
        x={chartWidth / 2}
        y={chartHeight + marginBottom}
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
      >
        Czas
      </text>

      {/* Podziałka osi X */}
      {Array.from({ length: maxTime + 1 }).map((_, i) => (
        <text
          key={i}
          x={marginLeft + i * scaleX}
          y={chartHeight + 20} // Etykiety osi X poniżej osi
          fontSize="12"
          textAnchor="middle"
        >
          {i}
        </text>
      ))}

      {/* Rysowanie zadań */}
      {sortedTasks.map((task, index) => (
        <g key={task.id}>
          {/* Pasek aktywności (czas trwania) */}
          {task.isCritical && (
            <rect
              x={marginLeft + task.es * scaleX}
              y={getPosition(index)}
              width={task.duration * scaleX}
              height={rowHeight - 10}
              fill="red"
              opacity="0.8"
            />
          )}
          {!task.isCritical && (
            <rect
              x={marginLeft + task.es * scaleX}
              y={getPosition(index)}
              width={task.duration * scaleX}
              height={rowHeight - 10}
              fill="gray"
              opacity="0.8"
            />
          )}
          {/* Pasek rezerwy (jeśli istnieje) */}
          {task.reserve > 0 && !eliminateReserve().includes(task.id) && (
            <rect
              x={marginLeft + (task.es + task.duration) * scaleX}
              y={getPosition(index)}
              width={task.reserve * scaleX}
              height={rowHeight - 10}
              fill="green"
              opacity="0.8"
            />
          )}

          {/* Rysowanie przerywanych linii od taskFrom i taskTo */}
          <line
            x1={marginLeft + task.es * scaleX}
            y1={getPosition(index) + rowHeight / 2}
            x2={marginLeft + task.es * scaleX}
            y2={marginTop}
            stroke="black"
            strokeDasharray="5,5"
          />
          {task.ef === data.maxTime && (
            <line
              x1={marginLeft + (task.es + task.duration) * scaleX}
              y1={getPosition(index) + rowHeight / 2}
              x2={marginLeft + (task.es + task.duration) * scaleX}
              y2={marginTop}
              stroke="black"
              strokeDasharray="5,5"
            />
          )}
        </g>
      ))}

      {/* Wierzchołki u góry */}
      {data.tasks.map((task) => (
        <g key={task.id}>
          {/* Numer wierzchołka taskFrom */}
          <text
            x={marginLeft + task.es * scaleX}
            y={marginTop - 10}
            fontSize="12"
            textAnchor="middle"
          >
            {task.taskFrom}
          </text>
          {task.ef === data.maxTime && (
            <text
              x={marginLeft + (task.es + task.duration) * scaleX}
              y={marginTop - 10}
              fontSize="12"
              textAnchor="middle"
            >
              {task.taskTo}
            </text>
          )}
        </g>
      ))}

      {/* Oś Y (lewa) */}
      <line
        x1={marginLeft}
        y1={marginTop}
        x2={marginLeft}
        y2={chartHeight}
        stroke="black"
      />

      {/* Podpis lewej osi (czynności) */}
      <text
        x={marginLeft - 40}
        y={(chartHeight + marginTop) / 2}
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        transform={`rotate(-90, ${marginLeft - 40}, ${
          (chartHeight + marginTop) / 2
        })`}
      >
        Czynności
      </text>

      {/* Etykiety aktywności */}
      {sortedTasks.map((task, index) => (
        <text
          key={task.id}
          x={marginLeft - 10}
          y={getPosition(index) + 15}
          fontSize="12"
          textAnchor="end"
        >
          {task.activity}
        </text>
      ))}

      {/* Legenda */}
      <g transform={`translate(0, ${chartHeight + marginTop + 20})`}>
        <rect x={marginLeft} y={0} width={20} height={20} fill="red" />
        <text x={marginLeft + 30} y={15} fontSize="12">
          Czynność krytyczna
        </text>

        <rect x={marginLeft + 200} y={0} width={20} height={20} fill="green" />
        <text x={marginLeft + 230} y={15} fontSize="12">
          Rezerwa
        </text>
      </g>
    </svg>
  );
};

export default GanttChart;
