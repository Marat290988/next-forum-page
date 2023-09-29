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
import { FC, useState, useEffect, useRef } from "react";
import { getKeyFromSerachParam, getQueryParamsString } from "@/utils/url.util";
import { MyPagination } from "@/components/ui/MyPagination/MyPagination";
import { Footer } from "@/components/footer/Footer";

export const Forum: FC<{ forum?: IForum; name: string }> = ({

}) => {
  const router = useRouter();
  const fId = router.query.f;
  const [fStateId, setFStateId] = useState(router.query.f);
  const currentPageMutation = useRef(0);
  const { data, isLoading, refetch } = useQuery(
    ["forum", fId, 'page', currentPageMutation.current],
    (): Promise<{ forums: IForum[]; isForum: boolean; themes: any[], totalRows: number }> =>
      ForumService.getForumsByForumParent(fId as string, currentPageMutation.current),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );
  const { setLoadingWithParam } = useActions();
  const [currentPage, setCurrentPage] = useState<undefined | number>();
  
  const defaultQty = 10;
  const [totalPage, setTotalPage] = useState<undefined | number>();

  const effectIsLoading = useRef(false);

  const updateData = () => {
    setTotalPage(totalPage! + 1);
    if (totalPage! % defaultQty === 0) {
      currentPageMutation.current = currentPageMutation.current + 1;
      setLoadingWithParam(true);
      setCurrentPage(currentPageMutation.current);
      router.push(getQueryParamsString([{f: +fId! as number}, {p: currentPageMutation.current}, {c: defaultQty}]));
      return;
    }
    setLoadingWithParam(true);
    refetch().then((_) => {
      setLoadingWithParam(false);
    });
  };
  const user = useAuth();
  const [isShowAddSection, setIsShowAddSection] = useState(false);

  const parentPaginationHandle = (event: { selected: number }) => {
    if (event.selected === currentPageMutation.current) {
      return;
    }
    currentPageMutation.current = event.selected;
    setLoadingWithParam(true);
    router.push(getQueryParamsString([{f: +fId! as number}, {p: currentPageMutation.current}, {c: defaultQty}]));
  }

  useEffect(() => {
    if (user && user.role && data) {
      setIsShowAddSection(user.role === Role.ADMIN && data.isForum);
    }
    currentPageMutation.current = getKeyFromSerachParam('p');
    if (data?.totalRows) {
      setTotalPage(data?.totalRows);
      setCurrentPage(currentPageMutation.current);
      setFStateId(router.query.f)
    }
      
  }, [user, data]);

  useEffect(() => {
    if (router.query.p) {
      effectIsLoading.current = true;
      const page: number = +router.query.p;
      setCurrentPage(page);
      setLoadingWithParam(true);
      currentPageMutation.current = getKeyFromSerachParam('p');
      refetch().then((res) => {
        setLoadingWithParam(false);
        //setTotalPage(data?.totalRows);
        effectIsLoading.current = false;
      });
    }
  }, [router.query.p, router.pathname])

  useEffect(() => {
    if (router.query.p && !effectIsLoading.current) {
      setTotalPage(undefined);
      setCurrentPage(undefined);
      const page: number = +router.query.p;
      setCurrentPage(page);
      setLoadingWithParam(true);
      setFStateId(router.query.f);
      currentPageMutation.current = getKeyFromSerachParam('p');
      refetch().then((res) => {
        setLoadingWithParam(false);
        //setTotalPage(data?.totalRows);
      });
    }
  }, [router.query.f])

  useEffect(() => {
    setTimeout(() => {
      refetch().then((res) => {
        setLoadingWithParam(false);
        setTotalPage(data?.totalRows);
      });
    }, 500);
  }, [])

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
          {data && typeof totalPage === 'number' && totalPage !== 0 && <section>
            <MyPagination
              key={`${currentPage}${totalPage}${fStateId}`}
              qtyPerPage={defaultQty}
              totalPage={totalPage}
              parentPaginationHandle={parentPaginationHandle}
              initialPage={currentPage}
            />
          </section>}
        </div>
      </main>
      <Footer />
    </>
  );
};
