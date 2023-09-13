import Link from "next/link";
import { FC, ReactNode } from "react";

export type MyGridType = {
  value: string,
  gridColumns: string,
  style?: Record<string, string>,
  icon?: ReactNode,
  isLink?: boolean,
  linkBase?: string,
  canClick?: boolean,
  clickFunc?: () => void,
  id?: number
}

export const MyGridTableBase: FC<{cssClass?: string, myGridData: MyGridType[], id?: number}> = ({cssClass, myGridData, id}) => {

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
                key={gr.id ? gr.id : Math.random()}
                href={`/${gr.linkBase}=${id}&p=0&c=10`}
                shallow={true}
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
                key={gr.id ? gr.id : Math.random()}
                style={!!gr.style ? gr.style : {}}
                onClick={() => {gr.canClick && gr.clickFunc && gr.clickFunc()}}
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