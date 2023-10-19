import { axiosReq } from "@/axios/api";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const WaitPage = () => {
  const router = useRouter();

  const googleCheckToken =  useCallback(async (token: string) => {
    const res = await axiosReq({
      url: `google?token=${token}`
    });
    console.log(res.data)
  }, [])

  useEffect(() => {
    const hash = (router.asPath as string).split("#")[1]; // error=unauthorized_client&error_code=401error_description=Something+went+wrong
    const parsedHash = new URLSearchParams(hash);
    // console.log(parsedHash.get('access_token'))
    googleCheckToken(parsedHash.get('access_token') as string);
    
  }, [googleCheckToken])
  
}

export default WaitPage;