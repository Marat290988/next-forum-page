import { FC, useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { Header } from '@/components/header/Header';
import { useAuth } from '@/hooks/useAuth';
import { ProfileData } from '@/pages/profile';
import moment from 'moment';
import { Rating } from '@mui/material';
import { AiFillEdit } from 'react-icons/ai';
import { ChangePic } from './change-pic/ChangePic';
import { ProfileService } from '@/services/profile.service';
import { ToastContainer, toast } from 'react-toastify';
import { CommentService } from '@/services/comment.service';
import { IComment } from '@/pages/topic';
import { LastComments } from './last_comments/LastComments';
import { Footer } from '@/components/footer/Footer';

export const Profile: FC<{profileData: ProfileData}> = ({ profileData }) => {

  const user = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [isEditPic, setIsEditPic] = useState(false);
  const [urlImg, setImgUrl] = useState(profileData.user.imgUrl);
  const [lastComments, setLastComments] = useState<IComment[]>([]);

  const [pics, setPics] = useState<string[]>([]);

  const getPicsList = async () => {
    ProfileService.getAllPics().then((res: {fileNames: string[]}) => {
      setPics(res.fileNames);
    }).catch((e) => {
      console.warn(e);
      toast.error('Problems with network.');
    });
  }

  const getLastComment = async (userId: number) => {
    CommentService.getLastCommentByUserId(userId).then((res: {comments: IComment[]}) => {
      setLastComments(res.comments);
    }).catch((e) => {
      console.warn(e);
      toast.error('Problems with network.');
    });
  }

  const setUrl = (url: string) => {
    setImgUrl(url);
  }

  useEffect(() => {
    getPicsList();
    getLastComment(profileData.user.id);
  }, []);

  useEffect(() => {
    if (user && user.id === profileData.user.id) {
      setShowEdit(true);
    }
  }, [user])

  const changePic = async () => {
    setIsEditPic(true);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header user={user} />
      <main className={`main-container`}>
        <div className={`flex mt-[10px] p-[10px] gap-[15px]`}>

          <div className={`${styles['left-card-profile']} ${styles['card-profile']}`} style={{minHeight: 'calc(100vh - 85px)'}}>

            <div className={styles['left-card-profile-top']}>
              <div
                className={styles['image']}
                style={{backgroundImage: `url(/${urlImg}`}}
              >
                {showEdit && <div className={styles['edit-icon']} onClick={changePic}>
                  <AiFillEdit />
                </div>}
              </div>
              <p>
                <b>Name</b>: {profileData.user.name}
              </p>
              <p>
                <b>Email</b>: {profileData.user.email}
              </p>
              <p>
                <b>Joining date</b>: {moment(profileData.user.createdAt).format("DD.MM.YYYY")}
              </p>
              <p>
                <b>Number of topics</b>: {profileData.themesQ}
              </p>
              <p>
                <b>Number of comments</b>: {profileData.commentQ}
              </p>
            </div>

            <div className={styles['left-card-profile-bottom']}>
              <Rating readOnly value={profileData.avgRating} />
            </div>

          </div>

          <div className={`${styles['card-profile']} flex-grow`} style={{minHeight: 'calc(100vh - 85px)'}}>
            {isEditPic && <ChangePic picList={pics} close={() => {setIsEditPic(false)}} setUrl={setUrl} />}
            {!isEditPic && <LastComments comments={lastComments} />}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}