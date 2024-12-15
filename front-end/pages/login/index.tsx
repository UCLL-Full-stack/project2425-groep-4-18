import React from "react";
import RegisterForm from "../../components/login_register/loginform";
import LoginForm from "../../components/login_register/loginform";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Header from "@/components/header";
import Link from "next/link";

const Register: React.FC = () => {
  return (
    <>
      <Header></Header>
      <LoginForm />
      
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
export default Register;
