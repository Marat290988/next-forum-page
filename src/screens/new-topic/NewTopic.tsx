import { FC } from "react";
import styles from './NewTopic.module.scss';
import { CreateTopic } from "@/pages/new_topic";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/header/Header";

export const NewTopic: FC<{createTopServerData: CreateTopic}> = ({createTopServerData}) => {
  console.log(createTopServerData)

  const user = useAuth();

  return (
    <>
      <Header user={user} />
    </>
  );
}