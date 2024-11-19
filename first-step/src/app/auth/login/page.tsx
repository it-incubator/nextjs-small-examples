'use client'
import {FormEvent} from "react";
import {useLoginMutation} from "@/features/auth/authSlice";

export default function LoginPage() {

    const  [login, result] = useLoginMutation()

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const json: any = Object.fromEntries(formData.entries());
            login(json)
            // You can access form data here
            // Example: const login = formData.get('login');

    }

  return (
    <div>
      Login

        <form onSubmit={handleSubmit}>
            <input name={'login'}  />
            <input name={'password'} type={'password'}/>
            <button>login</button>
        </form>


    </div>
  );
}
