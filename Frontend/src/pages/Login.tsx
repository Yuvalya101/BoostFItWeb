import { FormEvent, useState } from "react";
import { UserLoginValidationScheme } from "../validations";
import { useUser } from "../context/Auth.context";
import { ZodEffects, ZodError } from "zod";
<<<<<<< HEAD
=======
import { toast } from "react-toastify";
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459

export default function Login() {
  const [errors, setErrors] = useState(
    new Map([
      ["email", null],
      ["password", null],
    ])
  );
  const [serverError, setServerError] = useState<string | undefined>();

  const { login } = useUser();
  async function onSubmitLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(
      new Map([
        ["email", null],
        ["password", null],
      ])
    );
    setServerError(undefined);
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());
    try {
      const validatedData = UserLoginValidationScheme.parse(data);
      await login(validatedData);
<<<<<<< HEAD
=======
      toast("Welcome back!")
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
    } catch (e: any) {
      if (e instanceof ZodError) {
        const newErrors = new Map();
        for (var error of e.errors) {
          const [field] = (error as any).path;
          const message = (error as any).message;
          newErrors.set(field, message);
        }
        setErrors(newErrors);
      } else {
        setServerError(e.message);
      }
    }
  }

  return (
    <div>
<<<<<<< HEAD
      <form onSubmit={onSubmitLogin}>
=======
      <form className="auth-form" onSubmit={onSubmitLogin}>
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
        <div>
          <label>Email address:</label>
          <input name="email" required placeholder="Enter email address" />
          <span>{errors.get("email")}</span>
        </div>
        <div>
          <label>Password:</label>
          <input name="password" required placeholder="Enter Password" />
          <span>{errors.get("password")}</span>
        </div>
        <span className="h-[20px] text-center w-fit block mx-auto text-[12px] text-[red] font-bold">{serverError}</span>
        <button>Login</button>
      </form>
    </div>
  );
}
