import { fetchUserPosts } from "@/lib/actions/user.action"
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadsCard";
import { fetchCommunityPosts } from "@/lib/actions/community.action";
interface Result {
    name: string;
    image: string;
    id: string;
    threads: {
      _id: string;
      text: string;
      parentId: string | null;
      author: {
        name: string;
        image: string;
        id: string;
      };
      community: {
        id: string;
        name: string;
        image: string;
      } | null;
      createdAt: string;
      children: {
        author: {
          image: string;
        };
      }[];
    }[];
  }
interface Props {
    currentUserId:string,
    accountId:string,
    accountType:string,
}
const ThreadsTab = async ({currentUserId, accountId, accountType} : Props) => {
    //TODO FetchProfileThreads
   // let result = await fetchUserPosts(accountId);
  let result: any;
  if(accountType === 'Community'){
     result = await fetchCommunityPosts(accountId);
  }
  else{
    result = await fetchUserPosts(accountId);
  }
    if(!result) {redirect('/')}
    return (
        <>
        <section className="mt-9 flex flex-col gap-10">
        {result.threads.map((thread:any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
        //   community={
        //     accountType === "Community"
        //       ? { name: result.name, id: result.id, image: result.image }
        //       : thread.community
        //   }
        community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
        </section>
        
    </>
    )
}
export default ThreadsTab