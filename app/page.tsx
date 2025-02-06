
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Home() {

  const handleFormSubmission = async() => {
    "use server"
    // Login login goes here
    const cookieHandler = await cookies()
    cookieHandler.set("user", JSON.stringify({id: "EDS5TG", username: "Cole Palmar"}))
    redirect("/learn")
  }

  return (
    <div className="w-full p-10 flex flex-col gap-10">
      <h1 className="text-4xl text-center font-bold text-sky-900">Welcome to LMS</h1>
      <div className="w-full flex flex-col gap-10 max-w-96 rounded-lg shadow-lg bg-sky-50 mx-auto p-5">
        <h1 className="text-3xl text-sky-800 text-center">Login</h1>
        <form action={handleFormSubmission} className="w-full flex flex-col gap-5">
          <div className="relative w-full">
            <input type="text" name="username" id="username" className="w-full rounded-lg border-2 border-sky-800 bg-transparent px-8 py-1 text-lg" placeholder="Username" />
          </div>
          <div className="relative w-full">
            <input type="password" name="password" id="password" className="w-full rounded-lg border-2 border-sky-800 bg-transparent px-8 py-1 text-lg" placeholder="Password" />
          </div>
          <div className="relative w-full">
            <input type="submit" className="w-full rounded-lg text-sky-100  bg-sky-800 hover:bg-sky-900 transition-colors px-8 py-1 text-lg"/>
          </div>
        </form>
        <div className="flex flex-col gap-3 w-full justify-center items-center">
          <p className="text-center text-sky-500 text-sm transition-colors hover:text-sky-700 w-fit"><Link href={"#"}>Forgot password.</Link></p>
          <p className="text-center text-sky-900 text-sm w-fit">Not yet a member?, <span className="text-sky-500 transition-colors hover:text-sky-700"><Link href={"#"}>Click here to signup.</Link></span></p>
        </div>
      </div>
    </div>
  );
}
