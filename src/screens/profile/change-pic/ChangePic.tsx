import { FC, useEffect, useState } from "react";
import styles from './ChangePic.module.scss';
import { ProfileService } from "@/services/profile.service";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';

export const ChangePic: FC<{picList: string[], close: () => void, setUrl: (url: string) => void}> = ({ picList, close, setUrl }) => {

  console.log(picList)

  const changePic = async (url: string) => {
    await ProfileService.updatePic(url);
    setUrl(url);
  }

  return (
    <>
      <div className={`h-full relative`}>
        <div className={styles['remove-icon']} onClick={close}>
          <IoMdCloseCircle />
        </div>
        <div className='flex gap-[5px] flex-wrap mt-[28px]'>
          {picList && picList.map(pic => <div key={pic} style={{backgroundImage: `url(${pic})`}} className={styles['image']} onClick={() => changePic(pic)}>
            <div className={styles['image-cover']}><IoMdCheckmarkCircle /></div>
          </div>)}
        </div>
      </div>
    </>
  )
}