import { LoaderLayout } from "@/layouts/LoaderLayout/LoaderLayout";
import { ModalLayout } from "@/layouts/ModalLayout/ModalLayout";
import { store } from "@/store/store";
import "@/styles/ReactToastify.scss";
import "@/styles/globals.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LoaderLayout>
          <ModalLayout>
            <Component {...pageProps} />
          </ModalLayout>
        </LoaderLayout>
      </Provider>
    </QueryClientProvider>
  );
}
