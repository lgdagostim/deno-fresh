import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const data = await fetch(`https://api.github.com/users/lgdagostim`);
    if (data.status === 404) {
      return ctx.render(null);
    }
    const user: User = await data.json();
    return ctx.render(user);
  },
};

export default function Home({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found!</h1>;
  }
  return (
    <>
      <Head>
        <title>LGDAGOSTIM</title>
      </Head>
      <div class="p-12 mx-auto max-w-screen-md flex flex-col justify-center">
        <div className="inline flex justify-center items-center">
          {data}
        </div>
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter start={3} />
      </div>
    </>
  );
}
