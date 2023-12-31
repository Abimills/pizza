import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Featured from "@/components/Featured";
import PizzaList from "@/components/PizzaList";
import axios from "axios";
import { useState } from "react";
import AddButton from "@/components/AddButton";
import Add from "@/components/Add";
import CreatePizza from "@/components/Add";
import AdminPage from "@/components/AdminPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Amsterdam</title>
        <meta name="description" content="Best pizza shop in new york" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <div className={styles.adminPrev}>
        { admin && <AddButton setClose={setClose} />}
        {<AdminPage />}
      </div>
      <PizzaList pizzaList={pizzaList} />
      {!close && <CreatePizza setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data.products,
      admin,
    },
  };
};
