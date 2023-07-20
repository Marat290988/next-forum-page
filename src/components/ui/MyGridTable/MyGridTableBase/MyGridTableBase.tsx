import { FC, ReactNode } from "react";

export type MyGridType = {
  value: string,
  gridColumns: string,
  style?: Record<string, string>,
  icon?: ReactNode
}

export const MyGridTableBase: FC<{cssClass?: string, myGridData: MyGridType[]}> = ({cssClass, myGridData}) => {

  let gridStyle = '';
  myGridData.forEach(gr => {
    gridStyle += gr.gridColumns + ' ';
  });

  return (
    <>
      <div
        style={{gridTemplateColumns: gridStyle}}
        className={`grid ${cssClass}`}
      >
        {myGridData.map(gr => (
          <div
            key={gr.value}
            style={!!gr.style ? gr.style : {}}
          >
            {gr.icon ? gr.icon : <>{gr.value}</>}
          </div>
        ))}
      </div>
    </>
  );
}