import Link from "next/link";
import { FC, ReactNode } from "react";

export type MyGridType = {
  value: string,
  gridColumns: string,
  style?: Record<string, string>,
  icon?: ReactNode,
  isLink?: boolean
}

export const MyGridTableBase: FC<{cssClass?: string, myGridData: MyGridType[], forumId?: number}> = ({cssClass, myGridData, forumId}) => {

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
        {myGridData.map(gr => {
          if (gr.isLink) {
            return (
              <Link
                key={gr.value}
                href={`/forum?f=${forumId}`}
              >
                <div
                  style={!!gr.style ? gr.style : {}}
                >
                  {gr.icon ? gr.icon : <>{gr.value}</>}
                </div>
              </Link>
            )
          } else {
            return (
              <div
                key={gr.value}
                style={!!gr.style ? gr.style : {}}
              >
                {gr.icon ? gr.icon : <>{gr.value}</>}
              </div>
            )
          }
        })}
        {/* {myGridData.map(gr => (
          <div
            key={gr.value}
            style={!!gr.style ? gr.style : {}}
          >
            {gr.icon ? gr.icon : <>{gr.value}</>}
          </div>
        ))} */}
      </div>
    </>
  );
}