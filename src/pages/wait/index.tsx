import { useRouter } from "next/router";
import { useEffect } from "react";

const WaitPage = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = (router.asPath as string).split("#")[1]; // error=unauthorized_client&error_code=401error_description=Something+went+wrong
    const parsedHash = new URLSearchParams(hash);
    console.log(Object.fromEntries(parsedHash))
  }, [])
  
}

export default WaitPage;