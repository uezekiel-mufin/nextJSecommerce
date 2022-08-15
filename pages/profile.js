import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import { getError } from "../utils/error";

const Profile = () => {
  const { data: session } = useSession();

  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update"),
        {
          name,
          email,
          password,
        };

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");

      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <div>
      <Head>
        <title>Shipping Address</title>
        <meta name='description' content='Zicomm' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen justify-between flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='container m-auto mt-4 px-4 '>
          <form
            className='mx-auto max-w-screen-md'
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className='mb-4 text-xl '>Update Profile</h1>
            <div className='mb-4'>
              <label htmlFor='fullName'>Full Name</label>
              <input
                className='w-full'
                id='fullName'
                autoFocus
                type='text'
                {...register("fullName", {
                  required: "Please enter full name",
                })}
              />
              {errors.fullName && (
                <p className='text-red-500'>{errors.fullName.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='w-full'
                autoFocus
                {...register("email", {
                  required: "Please enter email address",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full'
                autoFocus
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "password should be more than 6 chars",
                  },
                })}
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password'>confirmPassword</label>
              <input
                type='password'
                id='confirmconfirmPassword'
                className='w-full'
                {...register("confirmPassword", {
                  required: "Please enter your password",
                  validate: (value) => value === getValues("password"),
                  minLength: {
                    value: 6,
                    message: "password should be more than 5 chars",
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className='text-red-500'>{errors.confirmPassword.message}</p>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <div className='text-red-500'>Pasword do not match</div>
                )}
            </div>

            <div className='mb-4'>
              <button className='primary-button'>Update profile</button>
            </div>
          </form>
        </main>
        <footer className='flex justify-center items-center h-10 shadow-inner'>
          Copyright &copy; 2022 Zicomm
        </footer>
      </div>
    </div>
  );
};
Profile.auth = true;
export default Profile;
