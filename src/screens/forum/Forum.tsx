import { Navigation } from "@/components/navigation/Navigation";
import { MyGridTable } from "./../../components/ui/MyGridTable/MyGridTable";
import { IForum } from "./../../pages/forum/index";
import styles from "./Forum.module.scss";
import { Header } from "@/components/header/Header";
import { AddForum } from "@/components/home-main/section-item/add-forum/AddForum";
import { MyButton } from "@/components/ui/MyButton/MyButton";
import { Role } from "@/enum/roles.enum";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { ForumService } from "@/services/forum.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";

export const Forum: FC<{ forum?: IForum; name: string }> = ({
  forum,
  name,
}) => {
  const router = useRouter();
  const fId = router.query.f;
  const { data, isLoading, refetch } = useQuery(
    ["forum", fId],
    (): Promise<{ forums: IForum[]; isForum: boolean; themes: any[] }> =>
      ForumService.getForumsByForumParent(fId as string)
  );
  const { setLoadingWithParam } = useActions();

  const updateData = () => {
    setLoadingWithParam(true);
    refetch().then((_) => {
      setLoadingWithParam(false);
    });
  };
  const user = useAuth();
  const [isShowAddSection, setIsShowAddSection] = useState(false);
  useEffect(() => {
    if (user && user.role && data) {
      setIsShowAddSection(user.role === Role.ADMIN && data.isForum);
    }
  }, [user, data]);

  useEffect(() => {
    setLoadingWithParam(isLoading);
  }, [isLoading]);

  const buttonClickHandle = () => {
    router.push("/new_topic?f=" + fId);
  };
  return (
    <>
      <Header user={user} />
      <Navigation />
      <main className={styles.main}>
        <div className="main-container">
          <div className="px-[10px]">
            {data && user && data.forums.length === 0 && (
              <MyButton buttonClick={buttonClickHandle} canClick={true}>
                Start a new topic
              </MyButton>
            )}
          </div>
          {data && <MyGridTable data={data} />}
          <div className="p-[10px]">
            {isShowAddSection && (
              <AddForum
                isInnerForum={true}
                sectionId={Number.parseInt(fId as string)}
                updateData={updateData}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
