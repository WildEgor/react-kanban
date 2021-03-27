import React from 'react';
import Column from 'Components/Column';
import { v4 as uuid } from "uuid";
import {useStyles} from 'Style/components';

import "./style.css";

const Main = ({ data, updateData }) => {
  const addBacklogCard = (name) => {
    updateData([
      ...data.map((dataItem) =>
        dataItem.title === "Backlog"
          ? {
              ...dataItem,
              issues: [
                ...dataItem.issues,
                {
                  id: uuid(),
                  name,
                },
              ],
            }
          : dataItem
      ),
    ]);
  };
  const moveCard = (id, index) => {
    updateData([
      ...data.map((dataItem, currentIndex) => {
        if (currentIndex === index) {
          return {
            ...dataItem,
            issues: [
              ...dataItem.issues,
              data[index - 1].issues.find((issue) => issue.id === id),
            ],
          };
        }
        if (currentIndex === index - 1) {
          return {
            ...dataItem,
            issues: dataItem.issues.filter((issue) => issue.id !== id),
          };
        }
        return dataItem;
      }),
    ]);
  };
  return (
    <main className="main">
      {data.map(({ title, issues }, index) => (
        <Column
          key={title}
          title={title}
          issues={issues}
          previousIssues={data[index - 1] ? data[index - 1].issues : []}
          addBacklogCard={addBacklogCard}
          onMove={(id) => moveCard(id, index)}
        />
      ))}
    </main>
  );
}

export default Main;