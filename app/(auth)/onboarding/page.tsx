import AccountProfile from "@/components/forms/AccountProfile";
import {currentUser} from '@clerk/nextjs'
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.action";
async function onboarding() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user ? user.id : "", // Use optional chaining and provide a default value
    objectId: userInfo?._id || "",
    username: userInfo?.username || user?.username || "", // Use nested null check
    name: userInfo?.name || user?.firstName || "", // Use nested null check
    bio: userInfo?.bio || "", // Use optional chaining
    image: userInfo?.image || user?.imageUrl || "",
  };
  
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads !
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile 
        user={userData} btnTitle="Continue"/>
      </section>
    </main>
  );
}
export default onboarding;
